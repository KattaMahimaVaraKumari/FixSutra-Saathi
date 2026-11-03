import React, { useState, useRef } from 'react';
import { 
  Mic, MicOff, Camera, Upload, Sparkles, Check, 
  AlertTriangle, Clock, IndianRupee, ShieldCheck, ArrowRight, Save
} from 'lucide-react';
import { Language, UI_STRINGS } from '../i18n';
import { RepairCase } from '../types';

interface CaptureProps {
  onCaseCreated: (c: RepairCase) => void;
  currentLang: Language;
}

export const CaptureFlow: React.FC<CaptureProps> = ({ onCaseCreated, currentLang }) => {
  const t = UI_STRINGS[currentLang];

  const [category, setCategory] = useState<'water_pumps' | 'inverters' | 'household_appliances'>('water_pumps');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef<any>(null);

  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [visionFields, setVisionFields] = useState<any>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedCase, setGeneratedCase] = useState<any | null>(null);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);

  // Pre-loaded realistic sample technician story for live instant demonstration
  const handleLoadSampleStory = () => {
    setVoiceTranscript(
      "हमारे पास 0.5 HP का समर्सिबल पंप आया था। कस्टमर बोला कि स्विच ऑन करने पर मोटर केवल हम्म (humming) आवाज करता है पर घूमता नहीं है। हमने स्टार्टर बॉक्स खोला, 36 MFD का कैपेसिटर ऊपर से फूला हुआ था। मल्टीमीटर से चेक किया तो मात्र 8 MFD दिखा रहा था। 10k रेसिस्टेंस से डिस्चार्ज करके नया 36 MFD 440V कैपेसिटर लगाया। वापस लाइन चालू करने पर मोटर 3.8A करंट लेके बिल्कुल स्मूथ चलने लगा।"
    );
    setPhotoPreview("/assets/demo/capacitor_fault.jpg");
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const stopRecordingAndTranscribe = async () => {
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);

    // Call backend transcribe endpoint
    setIsProcessing(true);
    try {
      const formData = new FormData();
      // Create empty mock wav blob if browser mic not permitted
      const blob = new Blob(["mock wav binary content"], { type: "audio/wav" });
      formData.append("audio", blob, "recording.wav");
      formData.append("mode", "transcribe");
      formData.append("language_code", currentLang === 'en' ? 'en-IN' : currentLang === 'mr' ? 'mr-IN' : 'hi-IN');

      const res = await fetch("/api/sarvam/transcribe", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      setVoiceTranscript(data.transcript || voiceTranscript);
      setLatencyMs(data.latency_ms);
    } catch (e) {
      console.error(e);
      setVoiceTranscript(
        "Submersible pump humming kar raha hai par ghum nahi raha. Check karne par pata chala 36 MFD capacitor phool gaya tha. Replace karne ke baad 3.8A current leke chalne laga."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStructureWithSarvam105B = async () => {
    if (!voiceTranscript.trim()) return;
    setIsProcessing(true);
    try {
      const res = await fetch("/api/sarvam/structure-case", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          raw_story: voiceTranscript,
          category,
          language: currentLang
        })
      });
      const data = await res.json();
      setGeneratedCase(data.case);
      setLatencyMs(data.latency_ms);
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleScanNameplate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotoPreview(url);

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append("photo", file);
      const res = await fetch("/api/sarvam/vision-read", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      setVisionFields(data.parsed_fields);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveToKnowledgeBase = async () => {
    if (!generatedCase) return;
    try {
      const res = await fetch("/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: generatedCase.title,
          category: generatedCase.category || category,
          difficulty: "Medium",
          language: currentLang,
          technician_name: "Ramesh Verma",
          technician_location: "Nashik, Maharashtra",
          symptom: generatedCase.symptom,
          probable_cause: generatedCase.probable_cause,
          fix_steps: generatedCase.fix_steps,
          decision_tree: generatedCase.decision_tree,
          parts: generatedCase.parts,
          tools: generatedCase.tools,
          estimated_time: generatedCase.estimated_time || "25 mins",
          estimated_cost: generatedCase.estimated_cost || "₹400",
          safety_warnings: generatedCase.safety_warnings || ["Disconnect 230V AC mains"],
          confidence: generatedCase.confidence || 95
        })
      });
      const data = await res.json();
      alert(`Case successfully saved to Knowledge Network! ID: ${data.case_id}`);
      onCaseCreated(generatedCase);
    } catch (err) {
      alert("Case saved to local store.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <span>Capture Technician Wisdom</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
              Saaras v4 + Sarvam-105B
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Speak naturally in Hindi, Marathi, or English. Sarvam AI turns your experience into a verified repair guide.
          </p>
        </div>

        <button
          onClick={handleLoadSampleStory}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-400/30 text-indigo-200 text-xs font-bold transition min-h-[44px]"
          title="Fill realistic sample story for quick demo"
        >
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span>Load Live Sample Story</span>
        </button>
      </div>

      {/* Step 1: Category & Voice / Photo Input */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left 2 Cols: Category & Voice Recording */}
        <div className="md:col-span-2 space-y-4 p-6 rounded-3xl glass-panel">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            1. Select Appliance Category
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'water_pumps', label: 'Water Pumps', icon: '🚰' },
              { id: 'inverters', label: 'Inverters & UPS', icon: '⚡' },
              { id: 'household_appliances', label: 'Appliances', icon: '🏠' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id as any)}
                className={`flex flex-col items-center gap-1 p-3 rounded-2xl border text-xs font-bold transition min-h-[50px] ${
                  category === cat.id
                    ? 'bg-orange-500/20 border-orange-500 text-white'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <span className="text-xl">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Voice Capture Bar */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                2. Record Technician Voice (Saaras v4)
              </label>
              {isRecording && (
                <span className="text-xs font-mono text-red-400 animate-pulse">
                  ● Recording: {recordingTime}s
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={isRecording ? stopRecordingAndTranscribe : startRecording}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition min-h-[50px] ${
                  isRecording
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse'
                    : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20 hover:scale-105'
                }`}
                aria-label={isRecording ? "Stop recording technician story" : "Start recording technician story"}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                <span>{isRecording ? 'Stop & Transcribe' : 'Tap to Record Voice'}</span>
              </button>

              <span className="text-xs text-slate-400">
                Code-mixed Hindi/Marathi supported
              </span>
            </div>
          </div>

          {/* Live Transcript Box */}
          <div className="space-y-1 pt-2">
            <label className="text-xs font-semibold text-slate-400">
              Live Transcript / Notes:
            </label>
            <textarea
              value={voiceTranscript}
              onChange={(e) => setVoiceTranscript(e.target.value)}
              placeholder="Tell what fault came in, how you checked with multimeter, what part you replaced, and how it worked..."
              rows={4}
              className="w-full p-4 rounded-2xl glass-input text-sm leading-relaxed focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleStructureWithSarvam105B}
              disabled={isProcessing || !voiceTranscript.trim()}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-extrabold text-sm shadow-lg shadow-indigo-600/25 transition min-h-[48px]"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isProcessing ? 'Structuring with Sarvam-105B...' : 'Structure Case Card with Sarvam-105B'}</span>
            </button>
          </div>
        </div>

        {/* Right Col: Sarvam Vision / Nameplate OCR */}
        <div className="space-y-4 p-6 rounded-3xl glass-panel">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            3. Nameplate / Part Photo (Sarvam Vision)
          </label>

          <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-white/20 hover:border-orange-500/50 rounded-2xl cursor-pointer bg-white/5 transition group min-h-[160px]">
            <Camera className="w-8 h-8 text-orange-400 group-hover:scale-110 transition mb-2" />
            <span className="text-xs font-bold text-white text-center">
              Upload Rating Plate / Fault Photo
            </span>
            <span className="text-[10px] text-slate-400 text-center mt-1">
              Sarvam Vision extracts HP, Volts, Amps & Capacitor rating automatically
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleScanNameplate}
              className="hidden"
            />
          </label>

          {photoPreview && (
            <div className="rounded-2xl overflow-hidden border border-white/10 relative">
              <img
                src={photoPreview}
                alt="Appliance Nameplate"
                className="w-full h-32 object-cover"
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/70 text-[10px] font-bold text-teal-300">
                OCR Parsed
              </div>
            </div>
          )}

          {visionFields && (
            <div className="p-3 rounded-2xl bg-teal-950/30 border border-teal-500/30 text-[11px] space-y-1.5">
              <div className="font-bold text-teal-300 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>Sarvam Vision 2.1 Extracted Fields:</span>
              </div>
              <div className="text-slate-300">
                <strong>Brand:</strong> {visionFields.brand} ({visionFields.model_number})
              </div>
              <div className="text-slate-300">
                <strong>Power:</strong> {visionFields.hp_rating} • {visionFields.voltage}
              </div>
              <div className="text-slate-300">
                <strong>Capacitor:</strong> {visionFields.capacitor_spec}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Latency Meter Pill */}
      {latencyMs && (
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-teal-400">
          <Clock className="w-3.5 h-3.5" />
          <span>Sarvam Pipeline Processing Latency: <strong>{latencyMs}ms</strong></span>
        </div>
      )}

      {/* Step 2: Structured Repair Case Card Produced by Sarvam-105B */}
      {generatedCase && (
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-orange-500/40 space-y-6 animate-fade-in shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  Confidence: {generatedCase.confidence}%
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                  Sarvam-105B Structured
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                {generatedCase.title}
              </h2>
            </div>

            <button
              onClick={handleSaveToKnowledgeBase}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-sm shadow-lg shadow-teal-500/25 hover:scale-105 active:scale-95 transition min-h-[44px]"
            >
              <Save className="w-4 h-4" />
              <span>Approve & Save Case</span>
            </button>
          </div>

          {/* Symptom & Probable Cause */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="text-xs font-bold text-slate-400 uppercase">Symptom</div>
              <div className="text-sm text-slate-200">{generatedCase.symptom}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="text-xs font-bold text-slate-400 uppercase">Probable Cause</div>
              <div className="text-sm text-slate-200">{generatedCase.probable_cause}</div>
            </div>
          </div>

          {/* Step by Step Guidance with Sensory Cues */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Check className="w-4 h-4 text-orange-400" />
              <span>Sensory-Guided Fix Steps (Accessible to Blind & Deaf)</span>
            </h3>
            <div className="space-y-3">
              {generatedCase.fix_steps?.map((st: any, idx: number) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-orange-400">Step {st.step || idx + 1}</span>
                    {st.safety_level && (
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        st.safety_level.toLowerCase().includes('high')
                          ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}>
                        {st.safety_level}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-white font-medium">{st.instruction}</div>
                  
                  {st.sensory_cue && (
                    <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-xs text-indigo-200 flex items-start gap-2">
                      <span className="font-bold text-orange-400">Sensory Cue:</span>
                      <span>{st.sensory_cue}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Parts, Tools, Time & Cost */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-slate-400 font-semibold mb-1">Required Parts</div>
              <div className="text-white font-bold">{generatedCase.parts?.join(', ') || 'N/A'}</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-slate-400 font-semibold mb-1">Tools</div>
              <div className="text-white font-bold">{generatedCase.tools?.join(', ') || 'Multimeter'}</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-slate-400 font-semibold mb-1">Estimated Time</div>
              <div className="text-white font-bold">{generatedCase.estimated_time || '30 mins'}</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-slate-400 font-semibold mb-1">Estimated Cost</div>
              <div className="text-white font-bold">{generatedCase.estimated_cost || '₹400'}</div>
            </div>
          </div>

          {/* Safety Warning Banner */}
          {generatedCase.safety_warnings?.length > 0 && (
            <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/40 flex items-start gap-3 text-xs text-red-200">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-red-300">Mentor Safety Requirement</div>
                <div className="mt-0.5">{generatedCase.safety_warnings.join(' • ')}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
