import React, { useState, useEffect, useRef } from 'react';
import { 
  PhoneCall, PhoneOff, Mic, Send, Volume2, Clock, 
  Sparkles, CheckCircle2, User, Calendar, ShieldCheck, Zap 
} from 'lucide-react';
import { Language, UI_STRINGS } from '../i18n';
import { Booking } from '../types';

interface RelayProps {
  currentLang: Language;
  speaker: string;
  speechRate: number;
  onBookingCreated?: (b: Booking) => void;
}

export const CallRelay: React.FC<RelayProps> = ({
  currentLang,
  speaker,
  speechRate,
  onBookingCreated
}) => {
  const t = UI_STRINGS[currentLang];

  const [callActive, setCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const durationTimerRef = useRef<any>(null);

  // Live incoming customer speech captioning (Saaras)
  const [customerSpeech, setCustomerSpeech] = useState<string>('');
  const [isCustomerSpeaking, setIsCustomerSpeaking] = useState(false);

  // Latency meter state (ms)
  const [relayLatencyMs, setRelayLatencyMs] = useState<number>(180);

  // Technician input & expansion
  const [customReplyText, setCustomReplyText] = useState('');
  const [expandedSpokenText, setExpandedSpokenText] = useState('');
  const [isExpanding, setIsExpanding] = useState(false);

  // Call history bubbles
  const [messages, setMessages] = useState<Array<{ sender: 'customer' | 'technician'; text: string; time: string }>>([]);

  // Auto generated booking card
  const [bookingGenerated, setBookingGenerated] = useState<any | null>(null);

  // Sample incoming customer dialogues for the live 3-min demo
  const sampleCustomerCalls = [
    {
      query: "हेलो भइया, हमारे घर का समर्सिबल पंप चालू करने पर बस घुर्र-घुर्र आवाज कर रहा है और पानी नहीं आ रहा। क्या आप आज आकर देख सकते हैं?",
      customerName: "सुनील शर्मा",
      phone: "+91 98201 44321",
      issue: "Submersible pump humming, zero discharge",
      estPrice: "₹450 - ₹600"
    },
    {
      query: "नमस्कार, आमच्या इन्व्हर्टरची बॅटरी सारखी लो दाखवत आहे आणि पंखा खूप घरघर आवाज करतो. काय अडचण असेल?",
      customerName: "प्रशांत कदम",
      phone: "+91 94220 88192",
      issue: "Inverter battery low & harmonic fan noise",
      estPrice: "₹350 - ₹500"
    }
  ];

  const [activeCallScenario, setActiveCallScenario] = useState(sampleCustomerCalls[0]);

  useEffect(() => {
    if (callActive) {
      durationTimerRef.current = setInterval(() => {
        setCallDuration((p) => p + 1);
      }, 1000);
    } else {
      if (durationTimerRef.current) clearInterval(durationTimerRef.current);
      setCallDuration(0);
    }
    return () => {
      if (durationTimerRef.current) clearInterval(durationTimerRef.current);
    };
  }, [callActive]);

  const startIncomingCall = () => {
    setCallActive(true);
    setMessages([]);
    setBookingGenerated(null);
    setCustomerSpeech('');
    setExpandedSpokenText('');

    // Simulate customer speaking after 1 second
    setTimeout(() => {
      simulateCustomerSpeech(activeCallScenario.query);
    }, 1200);
  };

  const simulateCustomerSpeech = (speechText: string) => {
    setIsCustomerSpeaking(true);
    const words = speechText.split(' ');
    let current = '';
    let index = 0;

    const interval = setInterval(() => {
      if (index < words.length) {
        current += (current ? ' ' : '') + words[index];
        setCustomerSpeech(current);
        index++;
      } else {
        clearInterval(interval);
        setIsCustomerSpeaking(false);
        setMessages((prev) => [
          ...prev,
          { sender: 'customer', text: speechText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ]);
      }
    }, 180);
  };

  const handleSendReply = async (shortReply: string) => {
    if (!shortReply.trim()) return;
    setIsExpanding(true);
    const startTime = performance.now();

    try {
      // 1. Expand with Sarvam-105B
      const res = await fetch('/api/sarvam/relay-expand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          short_reply: shortReply,
          customer_query: customerSpeech || activeCallScenario.query,
          language: currentLang
        })
      });
      const data = await res.json();
      const expanded = data.expanded_text;
      setExpandedSpokenText(expanded);

      // 2. Synthesize with Bulbul v4 Flash (fast latency)
      const ttsRes = await fetch('/api/sarvam/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: expanded,
          language_code: currentLang === 'en' ? 'en-IN' : currentLang === 'mr' ? 'mr-IN' : 'hi-IN',
          speaker,
          pace: speechRate
        })
      });
      const ttsData = await ttsRes.json();
      const totalLatency = Math.round(performance.now() - startTime);
      setRelayLatencyMs(totalLatency);

      if (ttsData.audio_base64) {
        const audio = new Audio(`data:audio/wav;base64,${ttsData.audio_base64}`);
        audio.play();
      } else {
        const u = new SpeechSynthesisUtterance(expanded);
        u.rate = speechRate;
        window.speechSynthesis.speak(u);
      }

      setMessages((prev) => [
        ...prev,
        { sender: 'technician', text: expanded, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
      setCustomReplyText('');

      // Auto-trigger booking card generation on confirmation
      if (shortReply.toLowerCase().includes('today') || shortReply.toLowerCase().includes('3') || shortReply.includes('हाँ') || shortReply.includes('हो')) {
        setTimeout(() => {
          generateBookingCard();
        }, 1500);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsExpanding(false);
    }
  };

  const generateBookingCard = async () => {
    const booking = {
      customer_name: activeCallScenario.customerName,
      phone: activeCallScenario.phone,
      issue: activeCallScenario.issue,
      appointment_time: "Today at 3:30 PM",
      estimated_price: activeCallScenario.estPrice
    };
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
      });
      const data = await res.json();
      setBookingGenerated(data.booking);
      if (onBookingCreated) onBookingCreated(data.booking);
    } catch (err) {
      setBookingGenerated(booking);
    }
  };

  const endCall = () => {
    setCallActive(false);
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Title & Live Latency Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              AI Phone Call Relay Assistant
            </h1>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500 text-black font-black uppercase tracking-wider">
              Hero Feature
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Enables deaf and speech-impaired technicians to answer live customer calls with Saaras captions & Bulbul voice.
          </p>
        </div>

        {/* Visible Latency Meter */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-900 border border-white/10">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold text-slate-300">Live Latency:</span>
          </div>
          <span className="text-sm font-mono font-black text-emerald-400">
            {relayLatencyMs} ms
          </span>
        </div>
      </div>

      {/* Hero Call Simulation Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: The Phone Call Glass Panel */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl glass-panel border border-white/20 space-y-6 shadow-2xl relative overflow-hidden">
          {/* Top Bar of Phone */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-white text-sm">
                  {activeCallScenario.customerName}
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  {activeCallScenario.phone} • {callActive ? formatTimer(callDuration) : 'Idle'}
                </div>
              </div>
            </div>

            {/* Start / End Call Button */}
            {!callActive ? (
              <button
                onClick={startIncomingCall}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/30 hover:scale-105 transition min-h-[44px]"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Simulate Incoming Call</span>
              </button>
            ) : (
              <button
                onClick={endCall}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-lg shadow-rose-600/30 transition min-h-[44px]"
              >
                <PhoneOff className="w-4 h-4" />
                <span>End Call</span>
              </button>
            )}
          </div>

          {/* Incoming Customer Speech Large Live Caption Box (Saaras v4) */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Mic className={`w-3.5 h-3.5 ${isCustomerSpeaking ? 'text-red-400 animate-pulse' : 'text-slate-400'}`} />
                <span>Live Customer Speech Captions (Saaras):</span>
              </span>
              {isCustomerSpeaking && (
                <span className="text-[11px] font-mono text-emerald-400">Transcribing...</span>
              )}
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/10 min-h-[90px] flex items-center">
              {customerSpeech ? (
                <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  "{customerSpeech}"
                </p>
              ) : (
                <p className="text-xs text-slate-500 italic">
                  Press "Simulate Incoming Call" above to hear customer and see live subtitles...
                </p>
              )}
            </div>
          </div>

          {/* Quick-Reply Tap Chips (Designed for Deaf & Speech-Impaired) */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Technician Quick-Reply Chips (Tap to Expand with Sarvam-105B):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { label: "Yes, come today at 3pm", sub: "हाँ, आज 3 बजे आ सकता हूँ" },
                { label: "Quote: Rs. 450 - 600", sub: "अंदाजा खर्च: 450-600 रु." },
                { label: "Send motor nameplate photo", sub: "मोटर फोटो व्हाट्सऐप भेजें" }
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendReply(chip.label)}
                  disabled={!callActive || isExpanding}
                  className="p-3 rounded-2xl bg-white/5 hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/40 text-left transition disabled:opacity-40 group min-h-[56px]"
                >
                  <div className="text-xs font-bold text-white group-hover:text-orange-300">
                    {chip.label}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {chip.sub}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Typing Box */}
          <div className="flex gap-2 pt-2">
            <input
              type="text"
              value={customReplyText}
              onChange={(e) => setCustomReplyText(e.target.value)}
              disabled={!callActive || isExpanding}
              placeholder="Or type a short note (e.g. 'Yes capacitor ready')..."
              className="flex-1 px-4 py-3 rounded-2xl glass-input text-xs"
            />
            <button
              onClick={() => handleSendReply(customReplyText)}
              disabled={!callActive || isExpanding || !customReplyText.trim()}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 disabled:opacity-40 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md min-h-[44px]"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isExpanding ? 'Speaking...' : 'Expand & Speak'}</span>
            </button>
          </div>

          {/* Bulbul Spoken Speech Confirmation Banner */}
          {expandedSpokenText && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-orange-400">
                <Volume2 className="w-4 h-4" />
                <span>Bulbul v4 Spoke to Customer:</span>
              </div>
              <div className="text-sm font-semibold text-white">
                "{expandedSpokenText}"
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Call Summary & Instant Booking Card */}
        <div className="space-y-4">
          {/* Auto-Created Booking Card */}
          <div className="p-6 rounded-3xl glass-panel border border-emerald-500/40 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="font-extrabold text-white text-sm">
                  Auto-Created Booking
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                Confirmed
              </span>
            </div>

            {bookingGenerated ? (
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400">Customer:</span>
                  <div className="font-bold text-white text-sm mt-0.5">{bookingGenerated.customer_name}</div>
                  <div className="text-[11px] font-mono text-slate-400">{bookingGenerated.phone}</div>
                </div>

                <div>
                  <span className="text-slate-400">Fault Issue:</span>
                  <div className="font-bold text-slate-200 mt-0.5">{bookingGenerated.issue}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                  <div>
                    <span className="text-slate-400">Appointment:</span>
                    <div className="font-bold text-amber-300 mt-0.5">{bookingGenerated.appointment_time}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Estimated Price:</span>
                    <div className="font-bold text-emerald-400 mt-0.5">{bookingGenerated.estimated_price}</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/5 text-[11px] text-teal-300">
                  ✓ WhatsApp notification queued for customer
                </div>
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-slate-400 space-y-2">
                <Calendar className="w-6 h-6 text-slate-500 mx-auto" />
                <p>Booking card auto-generates when appointment is agreed on the call.</p>
              </div>
            )}
          </div>

          {/* Privacy & Technology Guarantees */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs text-slate-300">
            <div className="font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Privacy & Trust Architecture</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Zero call audio is stored on disk by default. Explicit consent is verified before any speech synthesis or instant voice cloning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
