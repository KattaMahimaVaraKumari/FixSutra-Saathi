import json
import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "data", "fixsutra.db")
JSON_PATH = os.path.join(os.path.dirname(__file__), "data", "cases.json")

CASES = [
    # --- WATER PUMPS (10 CASES) ---
    {
        "id": "wp-01",
        "title": "Submersible Pump Motor Hums But Does Not Start",
        "category": "water_pumps",
        "category_name": "Water Pumps",
        "difficulty": "Medium",
        "language": "hi",
        "technician": {"name": "Ramesh Verma", "location": "Nashik, Maharashtra", "verified": True, "years_exp": 14, "avatar": "👨‍🔧"},
        "symptom": "0.5 HP submersible pump draws current, produces a deep 50Hz humming sound, but impeller does not rotate.",
        "probable_cause": "Start/Run capacitor (25-36 mfd) ruptured or weakened due to monsoon voltage surge.",
        "fix_steps": [
            {"step": 1, "instruction": "Turn off main isolator switch and discharge capacitor with 10k resistor across terminals.", "sensory_cue": "Ensure zero hum sound and feel cold capacitor casing before touching.", "sound_cue": "Silence confirms power cutoff.", "touch_cue": "Smooth cool plastic or metal casing.", "safety_level": "Caution"},
            {"step": 2, "instruction": "Unscrew control box lid, disconnect twin blue/yellow capacitor spade wires.", "sensory_cue": "Look for oily seepage or swollen top rubber cap on the cylindrical capacitor.", "smell_cue": "Pungent burnt electrolyte smell indicates breakdown.", "touch_cue": "Sticky residue on top vent.", "safety_level": "Low"},
            {"step": 3, "instruction": "Test capacitance with multimeter. If below 20 mfd (rated 36 mfd), replace with fresh 440V AC motor-run capacitor.", "sensory_cue": "Clean tactile snap when pushing quick-disconnect spade terminals.", "sound_cue": "Click of the spade connector snapping into socket.", "touch_cue": "Firm resistance when seating connector.", "safety_level": "Low"},
            {"step": 4, "instruction": "Secure wiring, restore MCB, and check motor rotation direction and current draw on ammeter.", "sensory_cue": "Smooth purring sound and rapid vibration indicates full prime rotation.", "sound_cue": "Rhythmic high-frequency hum replacing dull sluggish buzz.", "touch_cue": "Even, gentle vibration on discharge pipe.", "safety_level": "High Voltage"}
        ],
        "decision_tree": {
            "question": "Does the motor hum when power is switched on?",
            "yes": {"question": "Is the capacitor top cap bulged or leaking oil?", "yes": "Replace 36 MFD capacitor immediately (wp-01)", "no": "Check if impeller is mechanically sand-locked"},
            "no": "Check control box MCB fuse and magnetic coil continuity"
        },
        "parts": ["36 MFD 440V Motor Run Capacitor", "Crimp Spade Connectors"],
        "tools": ["Digital Multimeter", "Insulated Screwdriver (1000V)", "Wire Stripper"],
        "estimated_time": "25 mins",
        "estimated_cost": "₹350 - ₹500",
        "safety_warnings": ["HIGH VOLTAGE: 230V AC present. Ensure main breaker is locked out before opening control box.", "Capacitor stores electrical charge even after power disconnect; always discharge before touching."],
        "confidence": 96,
        "success_rate": 94,
        "repair_count": 42,
        "e_waste_kg_saved": 18.5,
        "money_saved": 4200,
        "mentor_verified": True
    },
    {
        "id": "wp-02",
        "title": "Monoblock Surface Pump Leaking Water Along Drive Shaft",
        "category": "water_pumps",
        "category_name": "Water Pumps",
        "difficulty": "Hard",
        "language": "en",
        "technician": {"name": "Sunil Jadhav", "location": "Kolhapur, Maharashtra", "verified": True, "years_exp": 18, "avatar": "👨‍🔧"},
        "symptom": "Continuous water dripping from the gap between the pump casting and motor flange while running.",
        "probable_cause": "Mechanical ceramic-carbon seal face worn out due to dry running with sandy water.",
        "fix_steps": [
            {"step": 1, "instruction": "Drain casing plug and unbolt front impeller housing with 13mm spanner.", "sensory_cue": "Water flow ceases completely from the drain port.", "sound_cue": "Hiss of trapped air escaping.", "touch_cue": "Casing turns completely cold.", "safety_level": "Low"},
            {"step": 2, "instruction": "Lock rear cooling fan with wooden wedge and unscrew impeller counter-clockwise.", "sensory_cue": "Notice gritty sand residue around shaft.", "sound_cue": "Scratchy friction sound as threads release.", "touch_cue": "Rough abrasive silt on brass impeller back.", "safety_level": "Medium"},
            {"step": 3, "instruction": "Extract damaged ceramic stationary ring and replace with new 16mm bellows mechanical seal.", "sensory_cue": "Apply a drop of soapy water on rubber boot; press in squarely.", "sound_cue": "Soft pop when seal seats into pocket.", "touch_cue": "Mirror-smooth ceramic face under clean fingertip.", "safety_level": "Low"},
            {"step": 4, "instruction": "Reassemble impeller with brass washer, torque bolts evenly in cross pattern, prime with clean water before powering.", "sensory_cue": "Shaft should spin freely by hand with gentle rubber drag.", "sound_cue": "Quiet frictionless glide.", "touch_cue": "Zero axial play when tugging shaft forward.", "safety_level": "Low"}
        ],
        "decision_tree": {
            "question": "Is water leaking continuously between pump casting and motor flange?",
            "yes": "Replace Mechanical Shaft Seal 16mm (wp-02)",
            "no": "Inspect suction flange paper gasket or hairline casting crack"
        },
        "parts": ["16mm Mechanical Carbon-Ceramic Seal", "Front Housing Paper Gasket"],
        "tools": ["13mm Ring Spanner", "Circlip Pliers", "Shaft Puller", "Wooden Wedge"],
        "estimated_time": "45 mins",
        "estimated_cost": "₹280 - ₹420",
        "safety_warnings": ["Impeller vanes have razor-sharp brass edges. Wear cut-resistant leather gloves during removal.", "Never run dry after repair; dry running destroys ceramic face within 45 seconds."],
        "confidence": 92,
        "success_rate": 90,
        "repair_count": 31,
        "e_waste_kg_saved": 22.0,
        "money_saved": 3800,
        "mentor_verified": True
    },
    {
        "id": "wp-03",
        "title": "Submersible Pump Trips MCB Instantly on Power ON",
        "category": "water_pumps",
        "category_name": "Water Pumps",
        "difficulty": "Hard",
        "language": "mr",
        "technician": {"name": "Pandurang Shinde", "location": "Satara, Maharashtra", "verified": True, "years_exp": 21, "avatar": "👨‍🔧"},
        "symptom": "पंप चालू करताच MCB ताबडतोब ट्रिप होतो, पाण्याचा प्रवाह सुरू होत नाही.",
        "probable_cause": "पंप केबल जोडणीत पाणी शिरल्यामुळे अथवा मोटर वाइंडिंग अर्थ फॉल्ट (short to ground).",
        "fix_steps": [
            {"step": 1, "instruction": "मेन स्वीच पूर्ण बंद करा आणि स्टार्टरमधील तिन्ही वायर्स (लाल, पिवळा, निळा) वेगळ्या करा.", "sensory_cue": "जळालेल्या इन्सुलेशनचा तीव्र दुर्गंध तपासणे.", "sound_cue": "स्वीच ऑफ होताच पूर्ण शांतता.", "touch_cue": "वायर कव्हर थंड असल्याची खात्री करा.", "safety_level": "High Voltage"},
            {"step": 2, "instruction": "५०० व्होल्ट मेगर (Megger) मीटरच्या एका टोकाला मोटर वायर व दुसऱ्याला ग्राउंड लावा.", "sensory_cue": "मेगर काटा ० ओहम दाखवल्यास अर्थ फॉल्ट निश्चित होतो.", "sound_cue": "मेगर जनरेटर हँडल फिरवताना मंद गुंजन.", "touch_cue": "मेगर हँडलवर एकसमान दाब.", "safety_level": "High Voltage"},
            {"step": 3, "instruction": "पाण्यातील केबल जॉइंट वर काढा, वॉटरप्रूफ रबर टेप व रेझिन किट वापरून नवीन जॉइंट करा.", "sensory_cue": "हवाबंद रबर कोटिंग हाताला एकसमान मऊ लागते.", "sound_cue": "टेप ताणून गुंडाळताना बारीक चुरचुर आवाज.", "touch_cue": "कडक घट्ट वॉटरप्रूफ सील.", "safety_level": "Medium"},
            {"step": 4, "instruction": "मेगर रिडिंग २० मेगा-ओहम पेक्षा जास्त आल्यावरच स्टार्टर जोडा.", "sensory_cue": "मीटर काटा सुरक्षित ग्रीन झोनमध्ये स्थिर होतो.", "sound_cue": "स्टार्टर चालू होताच स्थिर आणि शांत आवाज.", "touch_cue": "पाइपमधून पाण्याचा जोरदार वेग जाणवणे.", "safety_level": "Low"}
        ],
        "decision_tree": {
            "question": "स्टार्टर ऑन करताच MCB ट्रिप होतो का?",
            "yes": {"question": "मेगर रिडिंग ० ते १ मेगा-ओहम दाखवते का?", "yes": "पाण्यातील केबल जॉइंट पुन्हा वॉटरप्रूफ करा (wp-03)", "no": "स्टार्टरचा ओव्हरलोड रिले तपासा"},
            "no": "व्होल्टेज सप्लाय आणि फेज इंडिकेटर तपासा"
        },
        "parts": ["3M Submersible Waterproof Joint Kit", "Self-amalgamating Rubber Tape"],
        "tools": ["500V Insulation Megger Tester", "Crimping Tool", "Heat Gun"],
        "estimated_time": "60 mins",
        "estimated_cost": "₹450 - ₹700",
        "safety_warnings": ["अतिधोकादायक: पाणी आणि वीज एकत्र संपर्क. मेन पावर बंद असल्याशिवाय काम करू नका.", "मेगर टेस्टिंग करताना वायरच्या उघड्या टोकाला हात लावू नका."],
        "confidence": 95,
        "success_rate": 89,
        "repair_count": 53,
        "e_waste_kg_saved": 35.0,
        "money_saved": 8500,
        "mentor_verified": True
    },
    {
        "id": "wp-04",
        "title": "Agricultural Monoblock Pump Low Water Discharge and Cavitation Rattle",
        "category": "water_pumps",
        "category_name": "Water Pumps",
        "difficulty": "Medium",
        "language": "hi",
        "technician": {"name": "Gopal Krishan", "location": "Rohtak, Haryana", "verified": True, "years_exp": 11, "avatar": "👨‍🔧"},
        "symptom": "Pump delivers only 30% normal water pressure with loud gravel-rattling sound in the suction chamber.",
        "probable_cause": "Foot valve strainer partially choked with pond weeds or loose air leak on suction PVC elbow.",
        "fix_steps": [
            {"step": 1, "instruction": "Inspect suction pipe union joint for hissing air suck while pump runs.", "sensory_cue": "Hissing sound and air bubbles visible in delivery spout.", "sound_cue": "Sharp whistling suction sound.", "touch_cue": "Vibration pulse at leaking elbow.", "safety_level": "Low"},
            {"step": 2, "instruction": "Pull foot valve from well sump, clean debris from brass mesh flap.", "sensory_cue": "Flap closes shut with a solid clunk under manual finger push.", "sound_cue": "Crisp brass clank on closing.", "touch_cue": "Smooth free pivot of hinge pin.", "safety_level": "Low"},
            {"step": 3, "instruction": "Reapply PTFE Teflon tape on 2.5 inch threaded adapter and torque firmly.", "sensory_cue": "Threads engage tight without wobbling.", "sound_cue": "Creak of tightening plastic threads.", "touch_cue": "Thick cushion of Teflon tape.", "safety_level": "Low"},
            {"step": 4, "instruction": "Full casing prime through air vent bolt until overflowing bubble-free.", "sensory_cue": "Solid heavy gush from discharge hose within 10 seconds of starting.", "sound_cue": "Deep rushing roar of uninterrupted water stream.", "touch_cue": "Heavy pressure recoil on discharge pipe.", "safety_level": "Low"}
        ],
        "decision_tree": {
            "question": "Is pump rattling like marbles inside casing?",
            "yes": "Air suction leak or choked foot valve (wp-04)",
            "no": "Check discharge pipe blockage or collapsed hose"
        },
        "parts": ["2.5 inch Cast Iron Foot Valve Flap", "Heavy Duty Teflon Tape (0.2mm)"],
        "tools": ["Pipe Wrench 18-inch", "Nylon Cleaning Brush", "Water Funnel"],
        "estimated_time": "35 mins",
        "estimated_cost": "₹180 - ₹300",
        "safety_warnings": ["Never run pump dry without priming; seal face burns out within 40 seconds."],
        "confidence": 94,
        "success_rate": 96,
        "repair_count": 64,
        "e_waste_kg_saved": 12.0,
        "money_saved": 2800,
        "mentor_verified": True
    },
    {
        "id": "wp-05",
        "title": "Domestic Booster Pump Cycling ON and OFF Rapidly (Hunting)",
        "category": "water_pumps",
        "category_name": "Water Pumps",
        "difficulty": "Easy",
        "language": "en",
        "technician": {"name": "Kavita Pillai", "location": "Bengaluru, Karnataka", "verified": True, "years_exp": 8, "avatar": "👩‍🔧"},
        "symptom": "Booster pump turns on for 3 seconds, shuts off for 2 seconds repeatedly even with all taps closed.",
        "probable_cause": "Expansion pressure tank internal butyl bladder lost pre-charge air pressure.",
        "fix_steps": [
            {"step": 1, "instruction": "Disconnect pump mains and open bathroom tap to drop plumbing pressure to zero.", "sensory_cue": "Pressure gauge needle drops to zero bar.", "sound_cue": "Water trickle fades to silence.", "touch_cue": "Plumbing pipe feels relaxed without internal tension.", "safety_level": "Low"},
            {"step": 2, "instruction": "Remove black cap on Schrader valve at top of expansion tank.", "sensory_cue": "Depress pin briefly; if water squirts out, bladder is torn and tank needs replacement.", "sound_cue": "Dry air puff vs wet squirt.", "touch_cue": "Cold metallic valve stem.", "safety_level": "Low"},
            {"step": 3, "instruction": "If dry, attach bicycle tire pump with gauge, pressurize to exactly 1.8 bar (26 psi).", "sensory_cue": "Feel tank body hollow metallic ring when tapped with knuckles.", "sound_cue": "Resonant bell-like ding when tapped with knuckle.", "touch_cue": "Firm resistance in tire pump handle.", "safety_level": "Low"},
            {"step": 4, "instruction": "Turn on pump power; pump starts once, charges line to 3.2 bar, and remains silent until tap opened.", "sensory_cue": "Zero click-cycling sound.", "sound_cue": "One clean relay click followed by prolonged silence.", "touch_cue": "Solid steady line pressure.", "safety_level": "Low"}
        ],
        "decision_tree": {
            "question": "Does booster pump cycle on and off continuously every few seconds?",
            "yes": "Recharge or replace pressure tank air bladder (wp-05)",
            "no": "Inspect non-return check valve for reverse leakage"
        },
        "parts": ["Schrader Air Valve Core", "24L Replacement Membrane (if ruptured)"],
        "tools": ["Tire Pressure Gauge", "Bicycle Floor Pump", "Valve Core Tool"],
        "estimated_time": "20 mins",
        "estimated_cost": "₹100 - ₹350",
        "safety_warnings": ["Do not overpressurize tank beyond rated 4 bar max limit."],
        "confidence": 97,
        "success_rate": 98,
        "repair_count": 48,
        "e_waste_kg_saved": 8.0,
        "money_saved": 2200,
        "mentor_verified": True
    },
    {
        "id": "wp-06",
        "title": "Centrifugal Pump Motor Casing Overheating and Thermal Overload Trip",
        "category": "water_pumps",
        "category_name": "Water Pumps",
        "difficulty": "Medium",
        "language": "hi",
        "technician": {"name": "Rajendra Patidar", "location": "Indore, Madhya Pradesh", "verified": True, "years_exp": 16, "avatar": "👨‍🔧"},
        "symptom": "Motor runs for 15 minutes, body becomes too hot to touch, then cuts off automatically.",
        "probable_cause": "Rear cooling fan cowl packed with bird nest/debris, and bearings dry of grease.",
        "fix_steps": [
            {"step": 1, "instruction": "Allow motor to cool down 30 minutes; isolate power cord.", "sensory_cue": "Casing temperature cools back to lukewarm ambient.", "sound_cue": "Silence as thermal protector cools.", "touch_cue": "Motor fins comfortable to rest bare palm on.", "safety_level": "Low"},
            {"step": 2, "instruction": "Unbolt rear sheet metal fan cover; clean packed dust and debris with brush.", "sensory_cue": "Observe fan blades; ensure no broken blades.", "sound_cue": "Rustle of dried straw and dust clearing.", "touch_cue": "Smooth intact plastic fan vanes.", "safety_level": "Low"},
            {"step": 3, "instruction": "Inject high-temperature lithium complex grease into front and rear bearing oil ports.", "sensory_cue": "Motor shaft spins smoothly with gentle finger push with no grinding sound.", "sound_cue": "Silence during manual spin.", "touch_cue": "Effortless freewheeling momentum.", "safety_level": "Low"},
            {"step": 4, "instruction": "Reinstall fan cowl and test temperature rise under continuous 30 min run.", "sensory_cue": "Strong airflow felt flowing across cooling fins.", "sound_cue": "Brisk air whoosh from fan cowl.", "touch_cue": "Cool air blast against back of hand.", "safety_level": "Low"}
        ],
        "decision_tree": {
            "question": "Does motor run normally then trip after getting very hot?",
            "yes": "Clean cooling fins/fan and lubricate dry bearings (wp-06)",
            "no": "Check winding resistance for short turns"
        },
        "parts": ["Lithium Base High-temp Grease", "Replacement Nylon Cooling Fan (14mm bore)"],
        "tools": ["Bearing Grease Injector", "Wire Brush", "Infrared Thermometer"],
        "estimated_time": "30 mins",
        "estimated_cost": "₹150 - ₹250",
        "safety_warnings": ["Never operate motor with fan cover removed; high-speed rotating fan hazard."],
        "confidence": 93,
        "success_rate": 95,
        "repair_count": 39,
        "e_waste_kg_saved": 16.0,
        "money_saved": 3100,
        "mentor_verified": True
    },
    {
        "id": "wp-07",
        "title": "Deep Borewell Submersible Sand Lock Impeller Jam",
        "category": "water_pumps",
        "category_name": "Water Pumps",
        "difficulty": "Hard",
        "language": "mr",
        "technician": {"name": "Dattatray Kadam", "location": "Sangli, Maharashtra", "verified": True, "years_exp": 25, "avatar": "👨‍🔧"},
        "symptom": "बोरवेल पंप चालू केल्यानंतर अ‍ॅम्पिअर खूप वाढतो पण पाणी बाहेर येत नाही.",
        "probable_cause": "बोरवेल तळातील बारीक वाळू आणि गाळ पंप इम्पेलरच्या स्टेजमध्ये अडकल्याने शाफ्ट जाम झाला आहे.",
        "fix_steps": [
            {"step": 1, "instruction": "पंप स्टार्टरवरील ओवरलोड रिले तात्काळ ट्रिप होतो, पुन्हा थेट चालू करू नका.", "sensory_cue": "स्टार्टर रिलेमधून खडखड आवाज ऐकू येतो.", "sound_cue": "रिले ट्रिपचा तीक्ष्ण खटका.", "touch_cue": "स्टार्टर बॉक्स थोडा कोमट जाणवतो.", "safety_level": "Caution"},
            {"step": 2, "instruction": "पाइपलाइन आणि पंप बोरमधून हळूवार बाहेर काढा, पंप व मोटर कपलिंग उघडा.", "sensory_cue": "कपलिंग हाताने फिरत नाही, घट्ट जाम जाणवते.", "sound_cue": "काहीही हालचाल न होता पूर्ण अडकलेला आवाज.", "touch_cue": "शाफ्टवर हाताने जोर देऊनही फिरत नाही.", "safety_level": "Medium"},
            {"step": 3, "instruction": "पंप स्टेजवरील नट उघडून प्रत्येक डेल्रिन इम्पेलर पाण्याने स्वच्छ धुवा.", "sensory_cue": "वाळूचे बारीक कण निघाल्यावर इम्पेलर सहज फिरतात.", "sound_cue": "वाळू धुताना पाण्याचा खळखळ आवाज.", "touch_cue": "इम्पेलरचा गुळगुळीत पृष्ठभाग.", "safety_level": "Low"},
            {"step": 4, "instruction": "कपलिंग जोडून शाफ्ट अ‍ॅल्युमिनिअम रेंचने फ्री फिरवून तपासा, नंतर बोरवेलमध्ये सुरक्षित सोडा.", "sensory_cue": "शाफ्ट हाताने अगदी सहज, विना अडथळा ३६० अंश फिरतो.", "sound_cue": "एकदम शांत आणि हलकी गती.", "touch_cue": "शाफ्ट हाताच्या दोन बोटांनी सहज फिरतो.", "safety_level": "Medium"}
        ],
        "decision_tree": {
            "question": "बोरवेल पंप चालू करताच अ‍ॅम्पिअर मीटर २०A वर काटा फेकला जातो का?",
            "yes": "इम्पेलर वाळूमुळे जाम - स्टेज स्वच्छ करा (wp-07)",
            "no": "सप्लाय व्होल्टेज आणि फेज मिसिंग तपासा"
        },
        "parts": ["Delrin Stage Impeller Bush", "Stainless Steel Coupling Key"],
        "tools": ["Pipe Tripod Stand", "Chain Wrench", "High Pressure Wash Hose"],
        "estimated_time": "90 mins",
        "estimated_cost": "₹800 - ₹1400",
        "safety_warnings": ["बोरवेलमधून पंप काढताना वजनदार पाइप पडण्याचा धोका. सेफ्टी क्लॅम्प नेहमी घट्ट बसवा."],
        "confidence": 91,
        "success_rate": 87,
        "repair_count": 28,
        "e_waste_kg_saved": 45.0,
        "money_saved": 11000,
        "mentor_verified": True
    },
    {
        "id": "wp-08",
        "title": "Submersible Starter Relay Chatter and Burned Contact Points",
        "category": "water_pumps",
        "category_name": "Water Pumps",
        "difficulty": "Medium",
        "language": "en",
        "technician": {"name": "Mohan Lal", "location": "Jaipur, Rajasthan", "verified": True, "years_exp": 15, "avatar": "👨‍🔧"},
        "symptom": "Starter box creates loud buzzing machine-gun chatter sound on pressing green button.",
        "probable_cause": "Contactor electromagnet face covered in rust or silver contact tips pitted and oxidized.",
        "fix_steps": [
            {"step": 1, "instruction": "Turn off upstream isolator, open starter door, inspect 3-pole contactor armature.", "sensory_cue": "Blackened copper pitting smell and burnt soot.", "sound_cue": "No buzzing once isolator pulled.", "touch_cue": "Cold contactor body.", "safety_level": "High Voltage"},
            {"step": 2, "instruction": "Remove contactor return springs and slide out moving contact bridge.", "sensory_cue": "Rough sandpaper-like texture on silver tips.", "sound_cue": "Metallic ping of springs.", "touch_cue": "Pitted cratered metal tips.", "safety_level": "Low"},
            {"step": 3, "instruction": "Dress contact tips flat using fine 400 grit emery paper or replace kit.", "sensory_cue": "Clean shiny silver metal exposed.", "sound_cue": "Fine abrasive hiss.", "touch_cue": "Flat coplanar contact faces.", "safety_level": "Low"},
            {"step": 4, "instruction": "Clean pole faces with dry contact cleaner spray, verify firm mechanical pull-in by manual thumb push.", "sensory_cue": "Solid crisp clunk upon pressing contactor plunger.", "sound_cue": "Sharp definitive snap.", "touch_cue": "Snug spring return without sticking.", "safety_level": "Low"}
        ],
        "decision_tree": {
            "question": "Does contactor vibrate violently with buzzing noise?",
            "yes": "Dress or replace contactor tips and clean pole face (wp-08)",
            "no": "Check coil operating voltage (must be above 180V)"
        },
        "parts": ["3-Pole 25A Silver Contact Point Kit", "Contactor Coil 220V"],
        "tools": ["Zero-Residue Contact Cleaner", "400 Grit Emery Paper", "Philips Screwdriver"],
        "estimated_time": "30 mins",
        "estimated_cost": "₹220 - ₹380",
        "safety_warnings": ["Disconnect power prior to spraying flammable solvent cleaner."],
        "confidence": 95,
        "success_rate": 97,
        "repair_count": 72,
        "e_waste_kg_saved": 6.5,
        "money_saved": 1800,
        "mentor_verified": True
    },
    {
        "id": "wp-09",
        "title": "Pressure Boosting Automatic Pump Flow Switch Failure",
        "category": "water_pumps",
        "category_name": "Water Pumps",
        "difficulty": "Easy",
        "language": "hi",
        "technician": {"name": "Anil Sharma", "location": "Noida, Uttar Pradesh", "verified": True, "years_exp": 7, "avatar": "👨‍🔧"},
        "symptom": "Booster pump does not start automatically when bathroom tap is opened; runs only on manual bypass.",
        "probable_cause": "Magnetic reed switch paddle in flow controller stuck due to iron sediment deposition.",
        "fix_steps": [
            {"step": 1, "instruction": "Unplug power and close water inlet gate valve.", "sensory_cue": "Water flow ceases.", "sound_cue": "Dripping tap stops.", "touch_cue": "Gate valve handle turned fully clockwise.", "safety_level": "Low"},
            {"step": 2, "instruction": "Unscrew top plastic cap of in-line flow switch module.", "sensory_cue": "Observe reddish iron sludge around magnetic sensor paddle.", "sound_cue": "Plastic thread unthreading.", "touch_cue": "Slimy iron oxide sludge on paddle.", "safety_level": "Low"},
            {"step": 3, "instruction": "Clean paddle hinge with white vinegar and soft toothbrush until paddle pivots freely with breath blowing.", "sensory_cue": "Light magnetic snap feel when lifting paddle.", "sound_cue": "Subtle reed click when magnet passes sensor.", "touch_cue": "Feather-light pivot motion.", "safety_level": "Low"},
            {"step": 4, "instruction": "Reassemble with rubber O-ring, open inlet valve, check automatic start within 1 second of opening tap.", "sensory_cue": "Green run LED lights up instantly as tap opens.", "sound_cue": "Instant hum of motor as water flows.", "touch_cue": "Vibration of running booster motor.", "safety_level": "Low"}
        ],
        "decision_tree": {
            "question": "Does booster pump fail to detect water flow when tap opens?",
            "yes": "Clean magnetic flow sensor paddle (wp-09)",
            "no": "Test printed circuit board electronic pressure controller"
        },
        "parts": ["Silicone O-ring seal", "Magnetic Reed Sensor Module"],
        "tools": ["Small Flat Screwdriver", "Cleaning Brush", "Vinegar Descaler"],
        "estimated_time": "20 mins",
        "estimated_cost": "₹120 - ₹260",
        "safety_warnings": ["Ensure no water spills into the electronic junction box."],
        "confidence": 96,
        "success_rate": 95,
        "repair_count": 51,
        "e_waste_kg_saved": 4.2,
        "money_saved": 1500,
        "mentor_verified": True
    },
    {
        "id": "wp-10",
        "title": "Pump Delivers Water but Vibrates Excessively with High-Pitched Squeal",
        "category": "water_pumps",
        "category_name": "Water Pumps",
        "difficulty": "Medium",
        "language": "en",
        "technician": {"name": "Praveen Nair", "location": "Kochi, Kerala", "verified": True, "years_exp": 13, "avatar": "👨‍🔧"},
        "symptom": "Water output normal, but pump sounds like a metal grinding scream and vibrates the concrete base.",
        "probable_cause": "6204-2RS drive-end deep groove ball bearing pitted from water ingress through seal.",
        "fix_steps": [
            {"step": 1, "instruction": "Disconnect coupling and dismantle motor front end-shield with soft mallet taps.", "sensory_cue": "Rust stains visible around bearing cup.", "sound_cue": "Hollow clonk of mallet against cast iron.", "touch_cue": "Shield loosens from motor spigot.", "safety_level": "Low"},
            {"step": 2, "instruction": "Mount 2-jaw gear puller behind 6204 bearing and pull bearing off rotor shaft.", "sensory_cue": "Rough, gravelly resistance when spinning old bearing in fingers.", "sound_cue": "Shrill groan of old dry balls in cage.", "touch_cue": "Notchy gritty rotation in hand.", "safety_level": "Low"},
            {"step": 3, "instruction": "Warm new rubber-sealed C3 bearing slightly and seat onto shaft with pipe sleeve against inner race.", "sensory_cue": "Solid dull thud sound when bearing bottoms on shaft shoulder.", "sound_cue": "Solid ring of hammer on sleeve.", "touch_cue": "Bearing seated flush against shaft step.", "safety_level": "Low"},
            {"step": 4, "instruction": "Assemble end shield, fit new thrower washer, tighten tie-rods progressively.", "sensory_cue": "Whisper-quiet rotation and virtually zero vibration.", "sound_cue": "Gentle aerodynamic motor hum.", "touch_cue": "Silky smooth vibration-free housing.", "safety_level": "Low"}
        ],
        "decision_tree": {
            "question": "Is motor making screaming or gravel-grinding sound?",
            "yes": "Replace Ball Bearings 6204-2RS (wp-10)",
            "no": "Check motor mounting base bolts tightness"
        },
        "parts": ["SKF 6204-2RS Deep Groove Ball Bearing", "Rubber V-Ring Water Thrower"],
        "tools": ["2-Jaw Bearing Puller", "Copper Drift Sleeve", "Rubber Mallet"],
        "estimated_time": "40 mins",
        "estimated_cost": "₹300 - ₹480",
        "safety_warnings": ["Never hammer directly on bearing outer race; dents the raceway."],
        "confidence": 94,
        "success_rate": 92,
        "repair_count": 44,
        "e_waste_kg_saved": 14.0,
        "money_saved": 2600,
        "mentor_verified": True
    },

    # --- INVERTERS & UPS (10 CASES) ---
    {
        "id": "inv-01",
        "title": "Inverter Beeps Continuous Overload Alarm With Zero Load Connected",
        "category": "inverters",
        "category_name": "Inverters & UPS",
        "difficulty": "Hard",
        "language": "hi",
        "technician": {"name": "Vikram Rathore", "location": "Agra, Uttar Pradesh", "verified": True, "years_exp": 12, "avatar": "👨‍🔧"},
        "symptom": "Pure sine wave inverter switches on, immediately sounds a piercing continuous red-light overload buzzer even with all household appliances unplugged.",
        "probable_cause": "H-Bridge MOSFET short circuit (IRF3205 / HY4008) in one channel due to lightning grid transient.",
        "fix_steps": [
            {"step": 1, "instruction": "Disconnect 12V battery terminal leads immediately (negative black lead first).", "sensory_cue": "Piercing buzzer stops immediately; feel heat from rear aluminum heat sink.", "sound_cue": "Loud alarm ceases to absolute silence.", "touch_cue": "One side of heat sink significantly warmer than other.", "safety_level": "High Current"},
            {"step": 2, "instruction": "Open top metal chassis cover; discharge DC bus capacitors with insulated 100-ohm ceramic resistor.", "sensory_cue": "Notice burnt resin smell near MOSFET heatsink brackets.", "smell_cue": "Characteristic acrid silicon/epoxy smoke scent.", "touch_cue": "Cold discharged capacitor cans.", "safety_level": "Caution"},
            {"step": 3, "instruction": "Set multimeter to diode test mode. Measure drain-to-source resistance across all 8 MOSFETs. A shorted device reads 0.00V.", "sensory_cue": "Continuity meter beeps continuously on shorted MOSFET pair.", "sound_cue": "Meter tone indicates zero resistance short.", "touch_cue": "Cracked or charred epoxy package on failed transistor.", "safety_level": "Low"},
            {"step": 4, "instruction": "Desolder blown MOSFETs, replace matching set of IRF3205 with new thermal mica insulators and silicone paste, replace 10-ohm gate drive resistors, reconnect battery.", "sensory_cue": "Single short beep upon startup; green Inverter On LED steady.", "sound_cue": "Clean friendly confirmation beep (100ms).", "touch_cue": "Room-temperature heatsink with fans idling.", "safety_level": "Medium"}
        ],
        "decision_tree": {
            "question": "Does inverter sound overload alarm with zero output load?",
            "yes": "H-Bridge MOSFET short circuit - replace MOSFET pair & gate resistors (inv-01)",
            "no": "Check output current sensor shunt resistor (0.05 ohm)"
        },
        "parts": ["IRF3205 N-Channel MOSFETs (Matched Pair)", "10 Ohm 1/4W Metal Film Resistors", "Silicone Thermal Compound"],
        "tools": ["Temperature-controlled Soldering Station (60W)", "Desoldering Pump", "Digital Multimeter with Diode Test"],
        "estimated_time": "50 mins",
        "estimated_cost": "₹350 - ₹600",
        "safety_warnings": ["DC battery bank can deliver over 300 Amps of short-circuit current. Never bridge terminals with metal tools.", "Wear eye protection when soldering and testing power stages."],
        "confidence": 95,
        "success_rate": 93,
        "repair_count": 68,
        "e_waste_kg_saved": 11.5,
        "money_saved": 4800,
        "mentor_verified": True
    },
    {
        "id": "inv-02",
        "title": "Tubular Battery Terminal Severe White/Green Sulfate Crust and High Voltage Drop",
        "category": "inverters",
        "category_name": "Inverters & UPS",
        "difficulty": "Easy",
        "language": "en",
        "technician": {"name": "Arun Kumar", "location": "Chennai, Tamil Nadu", "verified": True, "years_exp": 10, "avatar": "👨‍🔧"},
        "symptom": "Inverter trips to 'Low Battery' within 10 minutes of power cut, but battery specific gravity shows fully charged.",
        "probable_cause": "Lead-acid battery positive post oxidized with thick lead sulfate crystal buildup creating a 2.5V contact drop under load.",
        "fix_steps": [
            {"step": 1, "instruction": "Switch off inverter DC breaker and prepare saturated baking soda water solution.", "sensory_cue": "Ensure no open flames; explosive hydrogen gas accumulates around charging batteries.", "sound_cue": "Fizzing effervescence when soda water touches acid crust.", "smell_cue": "Mild sulfuric smell neutralized by alkaline wash.", "safety_level": "Acid Hazard"},
            {"step": 2, "instruction": "Pour warm baking soda solution over lead clamps and scrub with brass wire brush until bare lead shines.", "sensory_cue": "Foaming green effervescence clears to reveal silvery lead alloy.", "sound_cue": "Scrubbing wire bristles against lead post.", "touch_cue": "Clean metallic smoothness replacing crumbly chalky crust.", "safety_level": "Low"},
            {"step": 3, "instruction": "Sand terminal inner surface with 120 grit paper, apply generous coating of pure petroleum jelly (Vaseline).", "sensory_cue": "Silky moisture-barrier film prevents future air oxidation.", "sound_cue": "Quiet wiping motion.", "touch_cue": "Greasy smooth barrier layer over lead.", "safety_level": "Low"},
            {"step": 4, "instruction": "Re-torque 13mm brass bolt securely (8 Nm) and test terminal voltage drop under full 400W load (must be <0.05V).", "sensory_cue": "Inverter runs for 4+ hours on backup without low battery warning.", "sound_cue": "Quiet continuous fan hum during backup.", "touch_cue": "Terminals remain ice cold under heavy discharge.", "safety_level": "Low"}
        ],
        "decision_tree": {
            "question": "Is backup time abnormally low while battery water level is full?",
            "yes": "Clean and protect oxidized battery terminals (inv-02)",
            "no": "Perform hydrometer specific gravity test per cell"
        },
        "parts": ["Pure Petroleum Jelly (Technical Grade)", "Heavy-duty Forged Brass Battery Clamps"],
        "tools": ["Brass Terminal Wire Brush", "13mm Insulated Box Spanner", "DC Voltmeter (0.01V resolution)"],
        "estimated_time": "25 mins",
        "estimated_cost": "₹80 - ₹180",
        "safety_warnings": ["Sulfuric acid corrosive to skin and eyes. Wear nitrile gloves and safety goggles.", "Do not use ordinary chassis grease; use acid-neutral petroleum jelly."],
        "confidence": 98,
        "success_rate": 99,
        "repair_count": 115,
        "e_waste_kg_saved": 42.0,
        "money_saved": 1600,
        "mentor_verified": True
    },
    {
        "id": "inv-03",
        "title": "इन्व्हर्टर मेन्स सप्लाय डिटेक्ट करत नाही (No Grid Charging)",
        "category": "inverters",
        "category_name": "Inverters & UPS",
        "difficulty": "Medium",
        "language": "mr",
        "technician": {"name": "Sanjay Deshmukh", "location": "Pune, Maharashtra", "verified": True, "years_exp": 17, "avatar": "👨‍🔧"},
        "symptom": "घरातील वीज चालू असतानाही इन्व्हर्टर मेन्स मोडवर जात नाही आणि बॅटरी चार्ज होत नाही.",
        "probable_cause": "मेन्स सेन्सिंग 24V DC रिलेचे कॉन्टॅक्ट पॉईंट्स जळाल्यामुळे रिले कॉइल ट्रिगर होत नाही.",
        "fix_steps": [
            {"step": 1, "instruction": "इन्व्हर्टरचा मेन्स प्लग सॉकेटमधून बाहेर काढा आणि बॅटरी वायर डिस्कनेक्ट करा.", "sensory_cue": "सर्व एलईडी दिवे बंद असल्याची खात्री करा.", "sound_cue": "रिलेचा टिक आवाज बंद होतो.", "touch_cue": "बॉडी पूर्णपणे शॉक-फ्री असल्याची खात्री.", "safety_level": "Caution"},
            {"step": 2, "instruction": "मदरबोर्डवरील इनपुट फ्यूज (ग्लास ट्यूब किंवा 15A रीसेट स्विच) मल्टीमीटरने तपासा.", "sensory_cue": "फ्यूज तुटलेला किंवा काळा पडलेला दिसतो.", "sound_cue": "मल्टीमीटर बीप न आल्यास फ्यूज खराब.", "touch_cue": "थंड काचेची फ्यूज नळी.", "safety_level": "Low"},
            {"step": 3, "instruction": "24V Sugar Cube Relay (Omron किंवा Songle) मदरबोर्डवरून डीसोल्डर करा आणि नवीन बसवा.", "sensory_cue": "सोल्डरिंग करताना स्वच्छ चंदेरी चमक.", "sound_cue": "सोल्डर पंपचा स्नॅप आवाज.", "touch_cue": "घट्ट बसलेला नवीन रिले.", "safety_level": "Medium"},
            {"step": 4, "instruction": "मेन्स प्लग लावा; 5 सेकंदात रिले 'टिक' करून मेन्स एलईडी आणि चार्जिंग अ‍ॅम्पिअर सुरू होतो.", "sensory_cue": "चार्जिंग अ‍ॅम्पिअर मीटर 12A वर जातो.", "sound_cue": "स्पष्ट 'टिक' रिले आवाज आणि ट्रान्सफॉर्मरचा मंद हम्म.", "touch_cue": "हळूहळू बॅटरी चार्जिंगचे तापमान जाणवणे.", "safety_level": "High Voltage"}
        ],
        "decision_tree": {
            "question": "घरात वीज असूनही 'Mains On' इंडिकेटर लागत नाही का?",
            "yes": "मेन्स इनपुट फ्यूज किंवा चेंजओव्हर रिले बदला (inv-03)",
            "no": "इनपुट व्होल्टेज 180V पेक्षा कमी आहे का ते तपासा"
        },
        "parts": ["24V DC 30A PCB Changeover Relay", "15A Fast-blow Glass Fuse"],
        "tools": ["Soldering Iron 40W", "Desoldering Wick", "Digital Multimeter"],
        "estimated_time": "35 mins",
        "estimated_cost": "₹150 - ₹280",
        "safety_warnings": ["मेन्स 230V AC बोर्डवर थेट उपलब्ध असते. चाचणी घेताना बोटांनी बोर्डला स्पर्श करू नका."],
        "confidence": 96,
        "success_rate": 95,
        "repair_count": 82,
        "e_waste_kg_saved": 9.0,
        "money_saved": 2400,
        "mentor_verified": True
    },
    {
        "id": "inv-04",
        "title": "Inverter Output Voltage High (280V) Damaging Connected Devices",
        "category": "inverters",
        "category_name": "Inverters & UPS",
        "difficulty": "Medium",
        "language": "hi",
        "technician": {"name": "Mahesh Soni", "location": "Kanpur, Uttar Pradesh", "verified": True, "years_exp": 19, "avatar": "👨‍🔧"},
        "symptom": "When running on battery backup, ceiling fans run extremely fast and LED bulb drivers burn out.",
        "probable_cause": "Feedback voltage divider preset trimmer (10k trimpot) drifted or oxidized due to humidity.",
        "fix_steps": [
            {"step": 1, "instruction": "Connect True-RMS multimeter to inverter rear 3-pin output socket under 100W test bulb load.", "sensory_cue": "Multimeter screen reads dangerously high 275-290V AC.", "sound_cue": "High-pitched coil whine from inverter transformer.", "touch_cue": "Bulb throws unusually intense harsh white glow.", "safety_level": "High Voltage"},
            {"step": 2, "instruction": "Locate VR1 (Voltage Regulation Preset 103 / 10k ohm) near feedback optocoupler PC817.", "sensory_cue": "Inspect trimmer for cracked wiper or green verdigris.", "sound_cue": "Click of multimeter probes.", "touch_cue": "Miniature blue trimmer knob.", "safety_level": "Caution"},
            {"step": 3, "instruction": "Replace with a high-precision Bourns 3296 multi-turn cermet trimmer potentiometer.", "sensory_cue": "Enables micro-fine voltage adjustments without sudden jumps.", "sound_cue": "Gentle mechanical click-stop at travel ends.", "touch_cue": "Smooth brass adjustment screw.", "safety_level": "Medium"},
            {"step": 4, "instruction": "Turn adjustment screw with ceramic screwdriver until output voltage stabilizes at exactly 225V AC.", "sensory_cue": "Multimeter holds rock-solid 225V AC (+/- 2V).", "sound_cue": "Transformer hum drops to deep relaxed purr.", "touch_cue": "Test bulb returns to soft warm white illumination.", "safety_level": "High Voltage"}
        ],
        "decision_tree": {
            "question": "Is output voltage on battery backup above 250V AC?",
            "yes": "Replace and calibrate feedback voltage preset trimmer (inv-04)",
            "no": "Check microcontroller PWM reference voltage"
        },
        "parts": ["Bourns 3296W 10K Multi-turn Trimpot", "PC817 Optocoupler"],
        "tools": ["True-RMS AC Multimeter", "Ceramic Trimmer Tuning Tool", "100W Incandescent Test Bulb"],
        "estimated_time": "30 mins",
        "estimated_cost": "₹120 - ₹220",
        "safety_warnings": ["Use non-conductive ceramic adjustment tool; metallic screwdrivers risk shorting adjacent high-voltage tracks."],
        "confidence": 94,
        "success_rate": 96,
        "repair_count": 57,
        "e_waste_kg_saved": 8.5,
        "money_saved": 3200,
        "mentor_verified": True
    },
    {
        "id": "inv-05",
        "title": "Inverter Cooling Fan Stalled Causing Thermal Shutdown Under Normal Load",
        "category": "inverters",
        "category_name": "Inverters & UPS",
        "difficulty": "Easy",
        "language": "en",
        "technician": {"name": "Deepak Chawla", "location": "Chandigarh", "verified": True, "years_exp": 9, "avatar": "👨‍🔧"},
        "symptom": "Inverter shuts down with flashing thermal warning light after 20 minutes of powering 2 fans and 3 lights.",
        "probable_cause": "12V 80mm brushless DC exhaust fan stuck due to pet hair and dust fluff in sleeve bearing.",
        "fix_steps": [
            {"step": 1, "instruction": "Disconnect AC and DC inputs, remove rear panel fan guard.", "sensory_cue": "Notice fan impeller does not spin when blown with mouth.", "sound_cue": "Complete silence when fan should be buzzing.", "touch_cue": "Heavy sticky resistance when nudging fan blades with fingertip.", "safety_level": "Low"},
            {"step": 2, "instruction": "Peel back fan central circular sticker, remove rubber dust plug and nylon C-clip.", "sensory_cue": "Notice dried dark grease and hair wrapped around stainless shaft.", "sound_cue": "Tiny snap of nylon retaining ring.", "touch_cue": "Gritty sludge on motor spindle.", "safety_level": "Low"},
            {"step": 3, "instruction": "Clean shaft with isopropyl alcohol, inject two drops of synthetic SAE 10W machine oil, reseat clip.", "sensory_cue": "Fan freewheels effortlessly for 4-5 seconds after flicking.", "sound_cue": "Soft whispering spin.", "touch_cue": "Feather-light frictionless glide.", "safety_level": "Low"},
            {"step": 4, "instruction": "Seal sticker with clear tape, plug 2-pin JST connector, test under 300W load.", "sensory_cue": "Fan kicks in smoothly as heatsink reaches 45 deg C; exhaust air flow strong and steady.", "sound_cue": "Consistent low-pitch breeze sound.", "touch_cue": "Steady warm air stream expelled from rear vent.", "safety_level": "Low"}
        ],
        "decision_tree": {
            "question": "Does inverter shut down hot without fan spinning?",
            "yes": "Clean and lubricate or replace 12V 80mm cooling fan (inv-05)",
            "no": "Check NTC thermistor sensor on main heatsink"
        },
        "parts": ["12V DC 0.20A 80mm Brushless Cooling Fan", "Synthetic Lubricant Oil"],
        "tools": ["Precision Tweezers", "Micro Screwdriver", "Cotton Swabs", "IPA (Isopropyl Alcohol)"],
        "estimated_time": "20 mins",
        "estimated_cost": "₹90 - ₹200",
        "safety_warnings": ["Keep fingers clear of moving fan blades when testing."],
        "confidence": 97,
        "success_rate": 98,
        "repair_count": 89,
        "e_waste_kg_saved": 5.0,
        "money_saved": 1400,
        "mentor_verified": True
    },
    {
        "id": "inv-06",
        "title": "Lead Acid Inverter Battery Cell Internal Short (Dead Cell 10.2V)",
        "category": "inverters",
        "category_name": "Inverters & UPS",
        "difficulty": "Medium",
        "language": "hi",
        "technician": {"name": "Om Prakash", "location": "Varanasi, Uttar Pradesh", "verified": True, "years_exp": 22, "avatar": "👨‍🔧"},
        "symptom": "150Ah battery never reaches 14.4V charging cutoff; inverter charges non-stop; battery casing bulges and boils.",
        "probable_cause": "One of the 6 internal cells shorted by shed positive active material mud bridging the bottom sediment ribs.",
        "fix_steps": [
            {"step": 1, "instruction": "Switch off charger immediately and let battery rest 1 hour.", "sensory_cue": "Feel side walls of all 6 cells; the shorted cell feels distinctly warmer than adjacent cells.", "smell_cue": "Rotten-egg hydrogen sulfide gas smell.", "touch_cue": "Noticeable local hot spot on one battery compartment.", "safety_level": "Acid Hazard"},
            {"step": 2, "instruction": "Unscrew vent caps and test specific gravity of each cell with optical refractometer or glass hydrometer.", "sensory_cue": "Five cells read healthy 1.240-1.260; the dead cell float sinks deep to red zone (<1.100).", "sound_cue": "Acid drawn into hydrometer suction bulb.", "touch_cue": "Glass hydrometer bobbing in electrolyte.", "safety_level": "Acid Hazard"},
            {"step": 3, "instruction": "Perform high-rate carbon pile discharge test (100A for 10 sec).", "sensory_cue": "Total voltage drops instantly below 9.0V, confirming dead internal cell.", "sound_cue": "Heavy sizzle and violent boiling bubbles in the dead cell only.", "touch_cue": "Vibration of rapid bubbling inside defective cell chamber.", "safety_level": "Acid Hazard"},
            {"step": 4, "instruction": "Explain to customer that internal physical plate bridge cannot be desulfated; arrange certified core recycling exchange credit.", "sensory_cue": "Customer receives ₹2,800 scrap credit towards fresh BIS-certified tubular battery.", "sound_cue": "Clear honest technician consultation.", "touch_cue": "Handing over signed battery warranty card.", "safety_level": "Low"}
        ],
        "decision_tree": {
            "question": "Is resting battery voltage stuck at ~10.5V and one cell hydrometer reading dead red?",
            "yes": "Internal Cell Short - Certified Battery Replacement & Core Recycling (inv-06)",
            "no": "Perform controlled equalization desulfation charge"
        },
        "parts": ["150Ah Tall Tubular C10 Battery (Core Exchange)"],
        "tools": ["Temperature-Compensated Hydrometer", "100A Carbon Pile Battery Load Tester", "Digital Voltmeter"],
        "estimated_time": "30 mins",
        "estimated_cost": "₹2800 - ₹9500 (Core Net)",
        "safety_warnings": ["Boiling acid releases highly explosive hydrogen/oxygen mixture. Work strictly in ventilated open-air space; no smoking or sparks."],
        "confidence": 99,
        "success_rate": 99,
        "repair_count": 140,
        "e_waste_kg_saved": 48.0,
        "money_saved": 3500,
        "mentor_verified": True
    },
    {
        "id": "inv-07",
        "title": "सोलर हायब्रिड इन्व्हर्टर MPPT सोलर चार्जिंग एरर",
        "category": "inverters",
        "category_name": "Inverters & UPS",
        "difficulty": "Hard",
        "language": "mr",
        "technician": {"name": "Ganesh Kulkarni", "location": "Nashik, Maharashtra", "verified": True, "years_exp": 13, "avatar": "👨‍🔧"},
        "symptom": "कडक ऊन असतानाही सोलर पॅनेलवरून बॅटरीमध्ये करंट जात नाही, स्क्रीनवर Solar Error 04 दाखवतो.",
        "probable_cause": "सोलर इनपुट रिव्हर्स पोलॅरिटी संरक्षण शॉटकी डायोड (Schottky Diode 60A 100V) ओव्हरव्होल्टेजमुळे फुटला आहे.",
        "fix_steps": [
            {"step": 1, "instruction": "रूफटॉप सोलर डीसी आयसोलेटर स्वीच बंद करा आणि पीव्ही वायर्स इन्व्हर्टरमधून बाहेर काढा.", "sensory_cue": "मल्टीमीटरने व्होल्टेज शून्य असल्याची खात्री करा.", "sound_cue": "आयसोलेटरचा मोठा खटका.", "touch_cue": "थंड वायर्स.", "safety_level": "High Voltage DC"},
            {"step": 2, "instruction": "MPPT बोर्डवरील TO-247 पॅकेज शॉटकी डायोड (MBR60100PT) तपासा.", "sensory_cue": "डायोडच्या मध्यभागी काळा डाग किंवा फुटलेला भाग दिसतो.", "sound_cue": "मल्टीमीटर बीप सतत वाजते.", "touch_cue": "खराब डायोडवर काजळी जाणवणे.", "safety_level": "Low"},
            {"step": 3, "instruction": "नवीन मूळ 60A 100V अल्ट्रा-फास्ट रेक्टिफायर डायोड हीटसिंकवर थर्मल पेस्ट लावून बसवा.", "sensory_cue": "स्क्रू घट्ट बसवल्याची खात्री.", "sound_cue": "स्क्रू ड्रायव्हरचा घट्ट आवाज.", "touch_cue": "गुळगुळीत पांढरी थर्मल पेस्ट.", "safety_level": "Medium"},
            {"step": 4, "instruction": "सोलर डीसी ऑन करा; 10 सेकंदात MPPT ट्रॅकिंग सुरू होऊन स्क्रीनवर 18A सोलर करंट दिसेल.", "sensory_cue": "डिस्प्लेवर हिरवा सोलर आयकॉन ब्लिंक होणे थांबून स्थिर होतो.", "sound_cue": "इन्व्हर्टरचा उत्साही बीप आवाज.", "touch_cue": "चार्जिंग दरम्यान केबलमध्ये मंद विद्युत कंपन.", "safety_level": "Low"}
        ],
        "decision_tree": {
            "question": "सोलर इनपुट व्होल्टेज असूनही स्क्रीनवर सोलर करंट ०A दाखवतो का?",
            "yes": "MPPT इनपुट शॉटकी डायोड बदला (inv-07)",
            "no": "सोलर रूफटॉप पॅनेलची एमसी4 कनेक्टर केबल तपासा"
        },
        "parts": ["MBR60100PT Schottky Barrier Rectifier", "Heatsink Thermal Paste"],
        "tools": ["Soldering Gun 60W", "Digital DC Clamp Meter", "Philips Screwdriver"],
        "estimated_time": "45 mins",
        "estimated_cost": "₹320 - ₹550",
        "safety_warnings": ["सोलर डीसी व्होल्टेज (100V DC) प्राणघातक असू शकते. भर उन्हात उघड्या हाताने डीसी तारांना स्पर्श करू नका."],
        "confidence": 93,
        "success_rate": 91,
        "repair_count": 36,
        "e_waste_kg_saved": 14.0,
        "money_saved": 5200,
        "mentor_verified": True
    },
    {
        "id": "inv-08",
        "title": "Inverter Buzzing Loudly and Distorting Sine Wave on Battery Mode",
        "category": "inverters",
        "category_name": "Inverters & UPS",
        "difficulty": "Medium",
        "language": "en",
        "technician": {"name": "Suraj Saxena", "location": "Lucknow, Uttar Pradesh", "verified": True, "years_exp": 11, "avatar": "👨‍🔧"},
        "symptom": "Connected ceiling fans make an intolerable metallic growling noise instead of smooth running.",
        "probable_cause": "Output LC filter electrolytic/polypropylene capacitor (2.2uF 400V) dried out, allowing high PWM harmonics into load.",
        "fix_steps": [
            {"step": 1, "instruction": "Isolate unit, remove cover, examine yellow/grey rectangular box capacitor near AC output filter inductor.", "sensory_cue": "Observe swollen sides or cracked resin seal on capacitor bottom.", "sound_cue": "Fan growl ceases once power removed.", "touch_cue": "Bulged bulging sides on plastic capacitor box.", "safety_level": "Caution"},
            {"step": 2, "instruction": "Desolder capacitor and test ESR (Equivalent Series Resistance) with LCR meter.", "sensory_cue": "LCR meter reveals capacitance dropped from 2.2uF down to 0.18uF with high ESR (>15 ohms).", "sound_cue": "Tester tone indicating high ESR.", "touch_cue": "Lightweight hollowed capacitor feel.", "safety_level": "Low"},
            {"step": 3, "instruction": "Solder replacement heavy-duty metallized polypropylene MKP X2 grade 2.2uF 450V AC capacitor.", "sensory_cue": "Shiny clean solder joints with full fillet flow.", "sound_cue": "Sizzle of fresh rosin core flux.", "touch_cue": "Firm rigid mounting onto PCB pads.", "safety_level": "Medium"},
            {"step": 4, "instruction": "Power on under fan load; verify clean 50Hz pure sine wave on portable oscilloscope or check fan silence.", "sensory_cue": "Fan spins completely silent with zero growl, identical to grid electricity.", "sound_cue": "Only pure gentle air breeze audible.", "touch_cue": "Silky vibration-free fan motor body.", "safety_level": "High Voltage"}
        ],
        "decision_tree": {
            "question": "Do fans hum loudly with harsh growl when on inverter backup?",
            "yes": "Replace Output LC Filter Capacitor 2.2uF 450V AC (inv-08)",
            "no": "Check if inverter is square-wave / quasi-sine wave model"
        },
        "parts": ["2.2uF 450V AC MKP Polypropylene Film Capacitor"],
        "tools": ["LCR Meter", "Soldering Iron 40W", "Handheld Digital Oscilloscope"],
        "estimated_time": "25 mins",
        "estimated_cost": "₹140 - ₹240",
        "safety_warnings": ["X2 filter capacitors can retain voltage; discharge with insulated test lead before handling."],
        "confidence": 96,
        "success_rate": 97,
        "repair_count": 63,
        "e_waste_kg_saved": 7.5,
        "money_saved": 2900,
        "mentor_verified": True
    },
    {
        "id": "inv-09",
        "title": "UPS Transfer Time Too Slow Causing Computer Reboot During Grid Outage",
        "category": "inverters",
        "category_name": "Inverters & UPS",
        "difficulty": "Easy",
        "language": "hi",
        "technician": {"name": "Manoj Tiwari", "location": "Patna, Bihar", "verified": True, "years_exp": 14, "avatar": "👨‍🔧"},
        "symptom": "Desktop computer and Wi-Fi router reboot every time the municipal electricity cuts off.",
        "probable_cause": "Rear panel toggle switch set to 'Normal Inverter Mode' (20ms transfer) instead of 'UPS Mode' (8ms transfer).",
        "fix_steps": [
            {"step": 1, "instruction": "Locate slide switch labeled 'UPS / Inverter' on rear panel beside output sockets.", "sensory_cue": "Notice switch is currently toggled to the wide-voltage standard Inverter position.", "sound_cue": "Subtle click of slide switch.", "touch_cue": "Tactile recessed toggle lever.", "safety_level": "Low"},
            {"step": 2, "instruction": "Slide switch firmly to 'UPS' mode using tip of pen.", "sensory_cue": "Window shifts voltage sensing range from 100-290V down to sensitive 180-260V window.", "sound_cue": "Firm mechanical latch click.", "touch_cue": "Switch seated flush in UPS notch.", "safety_level": "Low"},
            {"step": 3, "instruction": "Simulate power outage by pulling input mains plug while desktop PC is running 3D demo.", "sensory_cue": "Inverter switches within 6 milliseconds; computer display does not flicker even for one frame.", "sound_cue": "Ultra-fast instantaneous relay click without stutter.", "touch_cue": "Continuous steady hum from computer power supply.", "safety_level": "Low"},
            {"step": 4, "instruction": "Explain to client how mode works and label switch with waterproof sticker.", "sensory_cue": "Client confirms zero computer reboot issues.", "sound_cue": "Client satisfaction confirmation.", "touch_cue": "Applying durable vinyl label.", "safety_level": "Low"}
        ],
        "decision_tree": {
            "question": "Does PC turn off or restart during brief power switchover?",
            "yes": "Toggle rear slide switch to UPS Mode (<10ms) (inv-09)",
            "no": "Inspect PC SMPS hold-up capacitor health"
        },
        "parts": ["Waterproof Mode Label Decal"],
        "tools": ["Small Flat Screwdriver", "Power Outlet Tester"],
        "estimated_time": "10 mins",
        "estimated_cost": "₹0 - ₹100",
        "safety_warnings": ["Ensure UPS mode input voltage from grid does not chronically sag below 180V."],
        "confidence": 99,
        "success_rate": 100,
        "repair_count": 128,
        "e_waste_kg_saved": 3.0,
        "money_saved": 1200,
        "mentor_verified": True
    },
    {
        "id": "inv-10",
        "title": "Low Electrolyte Water Level in Inverter Battery Cells and Dry Plate Exposure",
        "category": "inverters",
        "category_name": "Inverters & UPS",
        "difficulty": "Easy",
        "language": "en",
        "technician": {"name": "Pooja Reddy", "location": "Hyderabad, Telangana", "verified": True, "years_exp": 6, "avatar": "👩‍🔧"},
        "symptom": "Float indicators on battery vent plugs dropped all the way to bottom red band; lead plates visible above acid level.",
        "probable_cause": "Natural evaporation during summer charging cycles; no water topped up for over 7 months.",
        "fix_steps": [
            {"step": 1, "instruction": "Turn off inverter mains switch and clean top surface of battery with damp cotton cloth to remove dust.", "sensory_cue": "Clean white plastic top prevents dirt falling into open vent holes.", "sound_cue": "Wiping cloth friction sound.", "touch_cue": "Smooth dust-free battery lid.", "safety_level": "Acid Hazard"},
            {"step": 2, "instruction": "Unscrew all 6 indicator float vent plugs counter-clockwise.", "sensory_cue": "Notice tops of grey lead plates dry and exposed to ambient air.", "sound_cue": "Light unthreading of plastic caps.", "touch_cue": "Lightweight indicator floats.", "safety_level": "Acid Hazard"},
            {"step": 3, "instruction": "Pour pure demineralized battery-grade distilled water (TDS < 10 ppm) using funnel until green indicator float rises to top mark.", "sensory_cue": "Float stem rises steadily until green indicator ring aligns with upper reference collar (approx 15mm above plates).", "sound_cue": "Gargling sound of water filling cell compartment.", "touch_cue": "Visual and tactile float rise.", "safety_level": "Low"},
            {"step": 4, "instruction": "Screw caps back tight, wipe any drips, turn on mains charging to allow gentle bubbling mixing.", "sensory_cue": "All 6 float stems standing proudly in green safe zone.", "sound_cue": "Reassuring soft tick of vent caps tightening.", "touch_cue": "Dry clean battery top.", "safety_level": "Low"}
        ],
        "decision_tree": {
            "question": "Are battery water indicator floats resting on the red line?",
            "yes": "Top up with pure Demineralized/Distilled Water (inv-10)",
            "no": "Check specific gravity if float is in green zone"
        },
        "parts": ["5 Litre Demineralized Battery Grade Water (TDS < 5 ppm)"],
        "tools": ["Battery Water Funnel with Fine Mesh", "TDS Meter Tester", "Safety Rubber Gloves"],
        "estimated_time": "15 mins",
        "estimated_cost": "₹80 - ₹140",
        "safety_warnings": ["NEVER add tap water, borewell water, or mineral water; dissolved minerals permanently poison lead plates within weeks.", "Never add acid; only pure water evaporates."],
        "confidence": 98,
        "success_rate": 99,
        "repair_count": 175,
        "e_waste_kg_saved": 38.0,
        "money_saved": 1100,
        "mentor_verified": True
    },

    # --- HOUSEHOLD APPLIANCES (10 CASES) ---
    {
        "id": "ha-01",
        "title": "Mixer Grinder Motor Sparking Heavily With Burnt Burning Smell",
        "category": "household_appliances",
        "category_name": "Household Appliances",
        "difficulty": "Easy",
        "language": "hi",
        "technician": {"name": "Santosh Kori", "location": "Jabalpur, Madhya Pradesh", "verified": True, "years_exp": 16, "avatar": "👨‍🔧"},
        "symptom": "Mixer grinder sparks violently through bottom cooling louvers when switched on, produces sharp ozone and burnt carbon smoke.",
        "probable_cause": "Universal motor carbon brushes worn down to the brass retaining clip, gouging commutator segments.",
        "fix_steps": [
            {"step": 1, "instruction": "Unplug 3-pin plug and unscrew bottom 4 base rubber feet screws.", "sensory_cue": "Lift plastic bottom cowl to access universal series motor.", "sound_cue": "Rubber feet screws unthreading.", "touch_cue": "Cold plastic body.", "safety_level": "Low"},
            {"step": 2, "instruction": "Unclip brass spring retainer from opposite carbon brush brass holders.", "sensory_cue": "Notice carbon sticks worn down to tiny 3mm nubs (original 18mm length).", "sound_cue": "Spring ping when released from catch.", "touch_cue": "Crumbly graphite block and loose copper pigtail wire.", "safety_level": "Low"},
            {"step": 3, "instruction": "Clean copper commutator segments with 400 grit emery strip, remove carbon dust between mica slots with needle.", "sensory_cue": "Copper segments gleam bright reddish-gold.", "sound_cue": "Gentle scraping hiss of emery strip.", "touch_cue": "Smooth continuous cylinder free of deep grooves.", "safety_level": "Low"},
            {"step": 4, "instruction": "Insert pair of genuine copper-impregnated graphite brushes, hook spring latch, reassemble base.", "sensory_cue": "Run on speed 1 for 2 minutes to bed brushes; motor runs at full RPM with zero sparking or smoke.", "sound_cue": "High-pitched crisp whistling whirl of healthy universal motor.", "touch_cue": "Vibration-free stable rubber foot grip on kitchen counter.", "safety_level": "Low"}
        ],
        "decision_tree": {
            "question": "Is mixer grinder sparking intensely through base vents?",
            "yes": "Replace Motor Carbon Brushes (ha-01)",
            "no": "Check armature winding for open commutator segment bar"
        },
        "parts": ["Universal Motor Carbon Brushes (Pair, 6x9x18mm with spring & clip)"],
        "tools": ["Philips Screwdriver #2", "400 Grit Emery Paper", "Dental Probe / Sewing Needle"],
        "estimated_time": "20 mins",
        "estimated_cost": "₹80 - ₹160",
        "safety_warnings": ["Always unplug cord before inspecting motor internals."],
        "confidence": 98,
        "success_rate": 97,
        "repair_count": 132,
        "e_waste_kg_saved": 4.5,
        "money_saved": 1800,
        "mentor_verified": True
    },
    {
        "id": "ha-02",
        "title": "Electric Storage Water Geyser Water Not Heating (Pilot Lamp ON)",
        "category": "household_appliances",
        "category_name": "Household Appliances",
        "difficulty": "Medium",
        "language": "en",
        "technician": {"name": "Naveen Joseph", "location": "Kottayam, Kerala", "verified": True, "years_exp": 12, "avatar": "👨‍🔧"},
        "symptom": "Geyser red pilot power lamp illuminates, but water remains ice cold even after 1 hour.",
        "probable_cause": "2000W copper heating element coil burned open due to heavy calcium hard water scaling.",
        "fix_steps": [
            {"step": 1, "instruction": "Isolate DP switch and test live terminals with neon phase tester.", "sensory_cue": "Ensure neon lamp remains totally dark on both poles.", "sound_cue": "Click of double pole MCB isolator.", "touch_cue": "Room temperature bottom cover.", "safety_level": "High Voltage"},
            {"step": 2, "instruction": "Disconnect element screw terminals; measure element resistance with multimeter.", "sensory_cue": "Multimeter shows infinite resistance / 'OL' (healthy 2kW element measures 26.4 ohms).", "sound_cue": "Zero continuity beep.", "touch_cue": "Terminal ceramic insulator intact.", "safety_level": "Low"},
            {"step": 3, "instruction": "Turn off cold water inlet valve, open hot tap, drain tank through safety valve drain hose.", "sensory_cue": "Wait until water stream ceases completely before unbolting triangular element flange.", "sound_cue": "Gurgle of emptying tank.", "touch_cue": "Cold drain hose.", "safety_level": "Low"},
            {"step": 4, "instruction": "Pull out old element; notice thick white limestone crust (cracked sheath). Install new ISI-certified 2kW copper element with fresh EPDM gasket and magnesium sacrificial anode rod.", "sensory_cue": "Refill tank with water until hot tap runs solid stream BEFORE reconnecting electrical wires.", "sound_cue": "Solid water stream from tap confirms full tank.", "touch_cue": "Tight flange bolts in star sequence.", "safety_level": "High Voltage"}
        ],
        "decision_tree": {
            "question": "Does geyser power light turn on but water stays cold?",
            "yes": "Heating Element Open Circuit - Replace 2kW Element & Anode (ha-02)",
            "no": "Inspect mechanical rod thermostat cut-off button"
        },
        "parts": ["2000W Triangular Flange Copper Heating Element", "Magnesium Sacrificial Anode Rod", "EPDM Flange O-Ring"],
        "tools": ["10mm Box T-Spanner", "Digital Multimeter", "Adjustable Pipe Wrench"],
        "estimated_time": "45 mins",
        "estimated_cost": "₹550 - ₹850",
        "safety_warnings": ["EXTREMELY DANGEROUS: Powering heating element in an empty tank causes immediate explosion/fire within 25 seconds. Tank must be 100% full of water before turning on."],
        "confidence": 97,
        "success_rate": 96,
        "repair_count": 84,
        "e_waste_kg_saved": 16.0,
        "money_saved": 4200,
        "mentor_verified": True
    },
    {
        "id": "ha-03",
        "title": "मिक्सर ग्राइंडर जारचे पाते जाम फिरत नाही (Seized Jar Bush)",
        "category": "household_appliances",
        "category_name": "Household Appliances",
        "difficulty": "Easy",
        "language": "mr",
        "technician": {"name": "Ashok Gaikwad", "location": "Kolhapur, Maharashtra", "verified": True, "years_exp": 15, "avatar": "👨‍🔧"},
        "symptom": "मिक्सरचा जार मोटरवर ठेवल्यावर गरगर आवाज येतो पण पाते फिरत नाही, जारचे कपलर खराब होते.",
        "probable_cause": "जारच्या पितळी बुशमध्ये पाणी आणि अन्नाचे कण शिरून गंज चढल्यामुळे शाफ्ट पूर्ण जाम झाला आहे.",
        "fix_steps": [
            {"step": 1, "instruction": "जार उलटवून खालील नायलॉन कपलर घड्याळाच्या दिशेने (क्लॉकवाइज / रिव्हर्स थ्रेड) पकडीने फिरवून उघडा.", "sensory_cue": "कपलर रिव्हर्स थ्रेड असतो हे लक्षात ठेवा.", "sound_cue": "कपलर सैल होताना बारीक चुरचुर आवाज.", "touch_cue": "नायलॉन दातांची झीज हाताने जाणवते.", "safety_level": "Low"},
            {"step": 2, "instruction": "ब्लेड शाफ्ट वरून हळूवार बाहेर ओढा, ब्रास बुश आणि शाफ्टवरील तपकिरी गंज तपासा.", "sensory_cue": "शाफ्टवर काळे थर आणि अन्न कणांचा वास येतो.", "sound_cue": "शाफ्ट घासून बाहेर येताना कर्कश आवाज.", "touch_cue": "शाफ्टचा खरखरीत भाग.", "safety_level": "Low"},
            {"step": 3, "instruction": "०८९ ब्रास बुश रीमर किंवा ० नंबरी सॅण्डपेपरने स्वच्छ करा, नवीन स्टेनलेस स्टील शाफ्टवर खोबरेल तेल लावा.", "sensory_cue": "शाफ्ट बुशमध्ये ठेवल्यावर कोणतीही अडचण न येता गरगर फिरतो.", "sound_cue": "एकदम गुळगुळीत आणि मऊ फिरण्याचा आवाज.", "touch_cue": "तेलाचा हलका थर आणि विना अडथळा फिरणे.", "safety_level": "Low"},
            {"step": 4, "instruction": "नवीन रबर वॉशर घाला, नवीन ६-टीथ नायलॉन कपलर घट्ट बसवा.", "sensory_cue": "पाते दोन बोटांनी फिरवून पाहिल्यावर पूर्ण फ्री फिरते.", "sound_cue": "काहीही आवाज न करता पाते फिरते.", "touch_cue": "वर-खाली प्ले (Play) फक्त १ मिमी असणे.", "safety_level": "Low"}
        ],
        "decision_tree": {
            "question": "जारचे पाते हाताने फिरत नाही किंवा खूप जड फिरते का?",
            "yes": "जार शाफ्ट आणि 089 ब्रास बुश स्वच्छ करा किंवा बदला (ha-03)",
            "no": "मिक्सर मोटरचे नायलॉन कपलर तपासा"
        },
        "parts": ["089 Brass Oilite Bush", "Stainless Steel Jar Shaft 4mm", "6-Teeth Nylon Coupler", "Fiber Washers"],
        "tools": ["Jar Coupler Opener Wrench", "Shaft Knockout Punch", "Clean Machine Oil"],
        "estimated_time": "15 mins",
        "estimated_cost": "₹60 - ₹120",
        "safety_warnings": ["जार ब्लेड अत्यंत तीक्ष्ण असतात. कपलर उघडताना ब्लेडला जाड कापडाने पकडावे."],
        "confidence": 98,
        "success_rate": 99,
        "repair_count": 162,
        "e_waste_kg_saved": 2.2,
        "money_saved": 950,
        "mentor_verified": True
    },
    {
        "id": "ha-04",
        "title": "Induction Cooktop Displays E0 Error Code and Does Not Heat Vessel",
        "category": "household_appliances",
        "category_name": "Household Appliances",
        "difficulty": "Easy",
        "language": "hi",
        "technician": {"name": "Kamlesh Prajapati", "location": "Ahmedabad, Gujarat", "verified": True, "years_exp": 10, "avatar": "👨‍🔧"},
        "symptom": "Induction cooktop powers on, beeps continuously and flashes 'E0' on LED display when cooking pot is placed.",
        "probable_cause": "Non-magnetic aluminium or curved-bottom vessel used, or pot-detection resonant capacitor (0.33uF 1200V) open circuit.",
        "fix_steps": [
            {"step": 1, "instruction": "Test vessel base with a pocket magnet. If magnet does not firmly stick, cookware is incompatible (aluminium/copper).", "sensory_cue": "Magnet snaps firmly onto ferromagnetic stainless steel or cast iron cookware.", "sound_cue": "Snappy magnetic click.", "touch_cue": "Strong pull force of magnet.", "safety_level": "Low"},
            {"step": 2, "instruction": "If cookware is magnetic and E0 persists, unplug cooktop and remove 6 glass-top mounting screws.", "sensory_cue": "Lift ceramic glass plate carefully; disconnect user interface ribbon cable.", "sound_cue": "Glass panel lifting free.", "touch_cue": "Smooth ceramic crystal surface.", "safety_level": "Low"},
            {"step": 3, "instruction": "Locate high-voltage resonant capacitor (0.3uF / 0.33uF 1200V DC MKP) wired in parallel across work coil.", "sensory_cue": "Inspect capacitor body for bulging sides or charred solder pins.", "sound_cue": "Continuity probe check.", "touch_cue": "Flat rectangular capacitor package.", "safety_level": "Low"},
            {"step": 4, "instruction": "Replace with new low-loss polypropylene 0.33uF 1200V induction capacitor and test with magnetic vessel.", "sensory_cue": "E0 error disappears; wattage displays 1600W; water starts boiling within 40 seconds.", "sound_cue": "High-frequency ultrasonic induction simmer tone.", "touch_cue": "Rapid heat generation inside pot base.", "safety_level": "High Voltage"}
        ],
        "decision_tree": {
            "question": "Does induction cooktop beep E0 error with magnetic pot on top?",
            "yes": "Replace 0.33uF 1200V High Voltage Resonant Capacitor (ha-04)",
            "no": "Replace vessel with flat induction-base magnetic steel"
        },
        "parts": ["0.33uF 1200V DC MKP Resonant Induction Capacitor"],
        "tools": ["Pocket Testing Magnet", "Soldering Iron 60W", "Philips Screwdriver"],
        "estimated_time": "25 mins",
        "estimated_cost": "₹110 - ₹200",
        "safety_warnings": ["IGBT heatsink and resonant tank capacitors store lethal 350V DC; always discharge before touching PCB tracks."],
        "confidence": 95,
        "success_rate": 94,
        "repair_count": 76,
        "e_waste_kg_saved": 3.8,
        "money_saved": 2100,
        "mentor_verified": True
    },
    {
        "id": "ha-05",
        "title": "Ceiling Fan Rotating Extremely Slowly on Highest Regulator Speed 5",
        "category": "household_appliances",
        "category_name": "Household Appliances",
        "difficulty": "Easy",
        "language": "en",
        "technician": {"name": "Balaram Das", "location": "Bhubaneswar, Odisha", "verified": True, "years_exp": 11, "avatar": "👨‍🔧"},
        "symptom": "Fan blades rotate sluggishly at barely 100 RPM instead of rated 380 RPM; motor makes faint groan.",
        "probable_cause": "2.25 MFD motor run capacitor dried up due to continuous operation, capacitance dropped to 0.6 MFD.",
        "fix_steps": [
            {"step": 1, "instruction": "Turn off fan wall switch and ceiling isolator switch.", "sensory_cue": "Ensure blades come to a complete standstill.", "sound_cue": "Air whoosh slows to complete silence.", "touch_cue": "Fan housing stopped still.", "safety_level": "High Voltage"},
            {"step": 2, "instruction": "Slide upper hanging canopy upwards on downrod to reveal capacitor clamp and wire connector.", "sensory_cue": "Notice white plastic cylindrical capacitor clamped to motor neck.", "sound_cue": "Plastic canopy sliding.", "touch_cue": "Cylindrical capacitor clamp screw.", "safety_level": "Low"},
            {"step": 3, "instruction": "Disconnect capacitor leads from 3-way terminal block; test on capacitance meter.", "sensory_cue": "Meter measures only 0.62 MFD (rated 2.25 MFD +/- 5%).", "sound_cue": "Silence during meter capacitance check.", "touch_cue": "Lightweight dry capacitor casing.", "safety_level": "Low"},
            {"step": 4, "instruction": "Install new ISI-marked 2.25 or 2.50 MFD 440V AC metallized oil-filled capacitor and restore wires.", "sensory_cue": "Fan starts vigorously and reaches full 380 RPM hurricane speed within 8 seconds.", "sound_cue": "Strong brisk rushing air circulation sound.", "touch_cue": "Heavy cooling air downdraft immediately felt on face.", "safety_level": "Low"}
        ],
        "decision_tree": {
            "question": "Does ceiling fan spin freely by hand but run sluggishly under power?",
            "yes": "Replace 2.25 MFD 440V Fan Capacitor (ha-05)",
            "no": "Check ball bearings 6201/6202 for mechanical binding"
        },
        "parts": ["2.25 MFD 440V AC Heavy Duty Fan Capacitor (EPCOS / Tibcon)"],
        "tools": ["Capacitance Multimeter", "Insulated Electrician Screwdriver", "Step Ladder"],
        "estimated_time": "15 mins",
        "estimated_cost": "₹50 - ₹120",
        "safety_warnings": ["Work from stable ladder; never reach towards rotating blades."],
        "confidence": 99,
        "success_rate": 99,
        "repair_count": 210,
        "e_waste_kg_saved": 5.5,
        "money_saved": 1500,
        "mentor_verified": True
    },
    {
        "id": "ha-06",
        "title": "इलेक्ट्रिक इस्त्री गरम होत नाही (Dry Iron Thermal Fuse Open)",
        "category": "household_appliances",
        "category_name": "Household Appliances",
        "difficulty": "Easy",
        "language": "mr",
        "technician": {"name": "Nitin Sawant", "location": "Ratnagiri, Maharashtra", "verified": True, "years_exp": 9, "avatar": "👨‍🔧"},
        "symptom": "इस्त्रीचा प्लग लावला तरी इंडिकेटर दिवा लागत नाही आणि बेस प्लेट अजिबात गरम होत नाही.",
        "probable_cause": "इस्त्री जास्त गरम झाल्यामुळे आतील २४० अंश सेल्सिअस थर्मल कटऑफ फ्यूज उडाला आहे.",
        "fix_steps": [
            {"step": 1, "instruction": "इस्त्रीचा मेन सप्लाय प्लग पूर्ण वेगळा करा आणि मागील कव्हरचे दोन स्क्रू उघडा.", "sensory_cue": "थंड सोल प्लेटची खात्री करा.", "sound_cue": "स्क्रू ड्रायव्हरने स्क्रू सैल होणे.", "touch_cue": "सोल प्लेट पूर्णपणे थंड.", "safety_level": "Low"},
            {"step": 2, "instruction": "थर्मोस्टॅट रॉड जवळ फायबरग्लास स्लीव्हमध्ये असलेला थर्मल फ्यूज (Thermal Fuse 10A 240°C) शोधा.", "sensory_cue": "बारीक धातूची नळी स्लीव्हमधून बाहेर काढा.", "sound_cue": "स्लीव्ह सरकवताना हलका आवाज.", "touch_cue": "बारीक दंडगोलाकार मेटल फ्यूज.", "safety_level": "Low"},
            {"step": 3, "instruction": "मल्टीमीटरने फ्यूजची निरंतरता (Continuity) तपासा; बीप न आल्यास फ्यूज ओपन झाला आहे.", "sensory_cue": "मीटर स्क्रीनवर 'OL' दाखवते.", "sound_cue": "बीप न वाजणे हे फ्यूज खराब असल्याचे दर्शवते.", "touch_cue": "फ्यूजच्या वायर्स थंड असणे.", "safety_level": "Low"},
            {"step": 4, "instruction": "नवीन 10A 240°C थर्मल फ्यूज क्रिम्पिंग स्लीव्हने जोडा (सोल्डरिंग करू नका, वितळते).", "sensory_cue": "कव्हर बसवून प्लग लावा; लाल दिवा लागतो आणि प्लेट 20 सेकंदात छान गरम होते.", "sound_cue": "थर्मोस्टॅट कटऑफचा सौम्य 'टिक' आवाज.", "touch_cue": "सोल प्लेटवरून हलकी उष्णतेची वाफ जाणवणे.", "safety_level": "High Voltage"}
        ],
        "decision_tree": {
            "question": "इस्त्रीचा इंडिकेटर दिवा आणि हीटिंग दोन्ही पूर्णपणे बंद आहे का?",
            "yes": "थर्मल कटऑफ फ्यूज 240°C बदला (ha-06)",
            "no": "पॉवर कॉर्ड केबलमधील ब्रेक तपासा"
        },
        "parts": ["10A 240°C Microtemp Thermal Fuse", "Fiberglass Heat Insulating Sleeve", "Brass Crimp Sleeves"],
        "tools": ["Crimping Tool", "Digital Multimeter", "Philips Screwdriver"],
        "estimated_time": "20 mins",
        "estimated_cost": "₹40 - ₹90",
        "safety_warnings": ["थर्मल फ्यूज कधीही सोल्डर करू नका, सोल्डरिंगच्या उष्णतेने नवीन फ्यूज जागीच उडतो. नेहमी मेकॅनिकल क्रिम्प वापरा."],
        "confidence": 98,
        "success_rate": 98,
        "repair_count": 145,
        "e_waste_kg_saved": 1.8,
        "money_saved": 800,
        "mentor_verified": True
    },
    {
        "id": "ha-07",
        "title": "Semi-Automatic Washing Machine Spin Tub Vibrates Violently and Bangs",
        "category": "household_appliances",
        "category_name": "Household Appliances",
        "difficulty": "Medium",
        "language": "hi",
        "technician": {"name": "Jagdish Sahu", "location": "Raipur, Chhattisgarh", "verified": True, "years_exp": 13, "avatar": "👨‍🔧"},
        "symptom": "Spin dryer tub bangs violently against outer cabinet walls as soon as spin timer is dialed, threatening to tip over.",
        "probable_cause": "One of the 3 rubber shock-absorbing buffer springs mounted on spin motor base cracked or snapped.",
        "fix_steps": [
            {"step": 1, "instruction": "Unplug power cord, disconnect drain hose, remove rear plastic service panel.", "sensory_cue": "Look down at the 3 triangular base mount springs supporting the vertical spin motor.", "sound_cue": "Rear panel clips snapping free.", "touch_cue": "Cold plastic clips.", "safety_level": "Low"},
            {"step": 2, "instruction": "Press down on spin motor housing with hand to evaluate rebound damping.", "sensory_cue": "One corner collapses completely with zero spring tension; rubber damper boot torn in half.", "sound_cue": "Lopsided squeak on pressing.", "touch_cue": "Cracked sticky perished rubber chunks.", "safety_level": "Low"},
            {"step": 3, "instruction": "Unbolt damaged buffer spring from bottom chassis bracket and spin motor leg.", "sensory_cue": "Extract broken spring assembly.", "sound_cue": "Unthreading 10mm bolt.", "touch_cue": "Rusty broken steel coil.", "safety_level": "Low"},
            {"step": 4, "instruction": "Install complete set of 3 matching heavy-duty OEM buffer rubber spring mounts.", "sensory_cue": "Tub stays centered perfectly; spins smoothly at 1400 RPM with gentle hum.", "sound_cue": "Even balanced spin drone without rhythmic thumping.", "touch_cue": "Outer cabinet remains calm and vibration-damped.", "safety_level": "Low"}
        ],
        "decision_tree": {
            "question": "Does spin dryer tub bang outer walls even with small balanced load?",
            "yes": "Replace Spin Motor Base Buffer Springs (ha-07)",
            "no": "Check if clothes are tangled unevenly in tub"
        },
        "parts": ["OEM Spin Motor Rubber Buffer Springs (Set of 3)"],
        "tools": ["10mm Socket T-Wrench", "Needle Nose Pliers", "Flashlight"],
        "estimated_time": "35 mins",
        "estimated_cost": "₹220 - ₹380",
        "safety_warnings": ["Never attempt to insert hand into spinning tub; spin mechanical brake safety microswitch must be verified."],
        "confidence": 96,
        "success_rate": 95,
        "repair_count": 59,
        "e_waste_kg_saved": 24.0,
        "money_saved": 2800,
        "mentor_verified": True
    },
    {
        "id": "ha-08",
        "title": "Microwave Oven Runs Turntable and Light But Does Not Heat Food",
        "category": "household_appliances",
        "category_name": "Household Appliances",
        "difficulty": "Hard",
        "language": "en",
        "technician": {"name": "Gurmeet Singh", "location": "Amritsar, Punjab", "verified": True, "years_exp": 20, "avatar": "👨‍🔧"},
        "symptom": "Microwave timer counts down, turntable revolves and internal bulb shines, but cup of water remains cold as ice.",
        "probable_cause": "High Voltage Diode (CL04-12) or HV 5kV 0.8A inline glass fuse ruptured due to cavity magnetron arc.",
        "fix_steps": [
            {"step": 1, "instruction": "CRITICAL: Unplug power cord. Remove outer metal wrap shroud. DISCHARGE 2100V HIGH VOLTAGE CAPACITOR with insulated 20k bleeder probe across terminals to chassis ground.", "sensory_cue": "Ensure zero residual voltage before touching any high voltage wires.", "sound_cue": "Tiny discharge tick (if not self-discharged).", "touch_cue": "Insulated heavy probe handle only.", "safety_level": "LETHAL VOLTAGE"},
            {"step": 2, "instruction": "Locate high voltage fuse in translucent plastic snap capsule between HV transformer and capacitor.", "sensory_cue": "Unclip capsule; inspect fine spring-wire inside glass fuse for open gap.", "sound_cue": "Plastic snap of capsule unlatching.", "touch_cue": "Smooth glass tube.", "safety_level": "Caution"},
            {"step": 3, "instruction": "Test HV rectifier diode with 9V battery circuit (cannot test with standard 3V multimeter due to diode barrier voltage).", "sensory_cue": "Diode should conduct forward in one direction with ~6V drop and block reverse completely.", "sound_cue": "Click of test leads.", "touch_cue": "Cold diode body.", "safety_level": "Low"},
            {"step": 4, "instruction": "Replace defective HV fuse (5kV 0.8A) and CL04-12 diode. Secure shroud before testing with glass of water.", "sensory_cue": "Deep authoritative resonance when microwave starts; water steams hot after 60 seconds.", "sound_cue": "Characteristic powerful 2.45 GHz cavity hum.", "touch_cue": "Cup of water steaming hot to touch.", "safety_level": "High Voltage"}
        ],
        "decision_tree": {
            "question": "Does microwave run normally but heat zero food?",
            "yes": "Discharge HV Capacitor; Replace 5kV HV Fuse & Diode (ha-08)",
            "no": "Inspect magnetron filament resistance and door safety microswitches"
        },
        "parts": ["5kV 0.8A High Voltage Microwave Fuse in Capsule", "CL04-12 High Voltage Diode (12kV)"],
        "tools": ["Insulated HV Capacitor Discharge Probe", "Digital Multimeter", "9V Battery Tester Kit", "Torx Screwdriver"],
        "estimated_time": "40 mins",
        "estimated_cost": "₹280 - ₹450",
        "safety_warnings": ["LETHAL VOLTAGE HAZARD: Microwave capacitors store over 2,000 Volts at lethal current even hours after unplugging. Only trained mentor-verified technicians may open microwave chassis."],
        "confidence": 93,
        "success_rate": 91,
        "repair_count": 47,
        "e_waste_kg_saved": 19.5,
        "money_saved": 4500,
        "mentor_verified": True
    },
    {
        "id": "ha-09",
        "title": "Electric Kettle Shuts OFF Prematurely Before Water Boils",
        "category": "household_appliances",
        "category_name": "Household Appliances",
        "difficulty": "Easy",
        "language": "hi",
        "technician": {"name": "Laxman Rawat", "location": "Dehradun, Uttarakhand", "verified": True, "years_exp": 8, "avatar": "👨‍🔧"},
        "symptom": "Electric kettle clicks off after 30 seconds when water is only lukewarm (around 50 deg C), well before boiling.",
        "probable_cause": "Thick calcium mineral scale on bottom stainless plate causes localized dry overheat, triggering bimetallic safety strip.",
        "fix_steps": [
            {"step": 1, "instruction": "Unplug base stand and inspect inside bottom heating plate.", "sensory_cue": "Notice rough white/grey limestone layer covering heating zone.", "sound_cue": "Scratchy friction sound when scraping with finger nail.", "touch_cue": "Chalky crusty roughness on mirror stainless floor.", "safety_level": "Low"},
            {"step": 2, "instruction": "Pour 200 ml of white food-grade vinegar (or 20g citric acid powder dissolved in 300 ml warm water).", "sensory_cue": "Observe immediate bubbling fizz reaction as acid dissolves alkaline mineral scale.", "sound_cue": "Gentle energetic fizzing effervescence.", "smell_cue": "Mild warm vinegar scent.", "safety_level": "Low"},
            {"step": 3, "instruction": "Let soak 20 minutes, then scrub gently with non-scratch nylon sponge and rinse with fresh water.", "sensory_cue": "Stainless steel bottom shines mirror-bright like new.", "sound_cue": "Smooth squeaky clean wiping sound.", "touch_cue": "Silky cold smooth stainless steel surface.", "safety_level": "Low"},
            {"step": 4, "instruction": "Fill kettle to MAX line with water, dock onto base, click switch down.", "sensory_cue": "Kettle brings water to rolling vigorous 100 deg C boil, steam tube transfers heat, auto switch clicks off crisply at true boil.", "sound_cue": "Vigorous boiling water rumble followed by clean definitive switch click.", "touch_cue": "Billows of hot steam issuing from spout.", "safety_level": "Low"}
        ],
        "decision_tree": {
            "question": "Does kettle trip off while water is still lukewarm?",
            "yes": "Descale heating floor plate with citric acid / vinegar (ha-09)",
            "no": "Replace handle steam bimetallic switch (KSD688)"
        },
        "parts": ["Citric Acid Descaling Crystals (50g)"],
        "tools": ["Non-scratch Nylon Sponge", "Measuring Cup"],
        "estimated_time": "25 mins",
        "estimated_cost": "₹30 - ₹60",
        "safety_warnings": ["Do not immerse kettle bottom electrical socket in water while rinsing."],
        "confidence": 99,
        "success_rate": 100,
        "repair_count": 188,
        "e_waste_kg_saved": 1.2,
        "money_saved": 700,
        "mentor_verified": True
    },
    {
        "id": "ha-10",
        "title": "फ्रिजच्या फ्रीझरमध्ये बर्फाचा डोंगर, खालच्या कप्प्यात थंडावा नाही (Defrost Failure)",
        "category": "household_appliances",
        "category_name": "Household Appliances",
        "difficulty": "Medium",
        "language": "mr",
        "technician": {"name": "Milind Borade", "location": "Aurangabad, Maharashtra", "verified": True, "years_exp": 18, "avatar": "👨‍🔧"},
        "symptom": "डबल डोअर फ्रीजच्या फ्रीझरमध्ये खूप जास्त बर्फ जमा होतो, पण खालच्या भाज्यांच्या कप्प्यात अजिबात थंडावा येत नाही.",
        "probable_cause": "ऑटो-डिफ्रॉस्ट बायमेटल थर्मोस्टॅट किंवा डिफ्रॉस्ट हीटर रॉड खराब झाल्यामुळे बर्फ वितळत नाही आणि एअर डक्ट चोक होते.",
        "fix_steps": [
            {"step": 1, "instruction": "फ्रीजचा प्लग सॉकेटमधून काढा, फ्रीझरमधील प्लास्टिक बॅक पॅनेल स्क्रू काढून उघडा.", "sensory_cue": "इव्हॅपोरेटर कॉइलवर जाड बर्फाचा थर आणि फॅनवर बर्फ अडकलेला दिसतो.", "sound_cue": "प्लास्टिक पॅनेल निघताना बर्फ तुटण्याचा आवाज.", "touch_cue": "बर्फाचा प्रचंड थंड थर.", "safety_level": "Low"},
            {"step": 2, "instruction": "स्टीमर किंवा कोमट पाण्याच्या स्प्रेने कॉइलवरील बर्फ हळूवार वितळवून ड्रेन पाईप मोकळा करा.", "sensory_cue": "पाणी मागच्या कॉम्प्रेसर ट्रेमध्ये वाहून जाते.", "sound_cue": "पाणी गळण्याचा ठिबक-ठिबक आवाज.", "touch_cue": "कॉइल स्वच्छ अ‍ॅल्युमिनिअम थंड पृष्ठभाग.", "safety_level": "Low"},
            {"step": 3, "instruction": "कॉइलला जोडलेला बायमेटल सेन्सर (Bimetal Defrost Thermostat -10°C) मल्टीमीटरने तपासा.", "sensory_cue": "बर्फात ठेवल्यावरही सेन्सरने निरंतरता न दाखवल्यास तो खराब झाला आहे.", "sound_cue": "मल्टीमीटर बीप न येणे.", "touch_cue": "प्लास्टिक पाऊचमधील बायमेटल डिस्क.", "safety_level": "Low"},
            {"step": 4, "instruction": "नवीन बायमेटल सेन्सर आणि थर्मल फ्यूज जोडून वॉटरप्रूफ हीटश्रिंक लावा आणि पॅनेल पूर्ववत बसवा.", "sensory_cue": "४ तासांत एअर डक्टमधून खालच्या कप्प्यात छान थंड हवा वाहू लागते.", "sound_cue": "फ्रीझर फॅनचा शांत, नियमित फिरणारा आवाज.", "touch_cue": "खालच्या कप्प्यात हात धरताच थंडगार हवेची झुळूक.", "safety_level": "Low"}
        ],
        "decision_tree": {
            "question": "फ्रीझरमध्ये बर्फ साचतोय पण खालच्या भागात थंडावा नाही का?",
            "yes": "डिफ्रॉस्ट बायमेटल सेन्सर / हीटर बदला (ha-10)",
            "no": "डॅम्पर कंट्रोल किंवा फ्रीझर फॅन मोटर तपासा"
        },
        "parts": ["Defrost Bimetal Thermostat Clip-on Sensor", "Thermal Fuse 72°C with Waterproof Harness"],
        "tools": ["Steam Gun / Warm Water Sprayer", "Digital Multimeter", "Wire Stripper", "Heat Shrink Tubing"],
        "estimated_time": "50 mins",
        "estimated_cost": "₹350 - ₹550",
        "safety_warnings": ["बर्फ काढण्यासाठी कधीही चाकू किंवा तीक्ष्ण स्क्रू ड्रायव्हर वापरू नका; अ‍ॅल्युमिनिअम कॉइल पंक्चर होऊन गॅस लीक होतो."],
        "confidence": 95,
        "success_rate": 93,
        "repair_count": 78,
        "e_waste_kg_saved": 32.0,
        "money_saved": 3400,
        "mentor_verified": True
    }
]

def init_db():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS cases (
            id TEXT PRIMARY KEY,
            title TEXT,
            category TEXT,
            category_name TEXT,
            difficulty TEXT,
            language TEXT,
            technician TEXT,
            symptom TEXT,
            probable_cause TEXT,
            fix_steps TEXT,
            decision_tree TEXT,
            parts TEXT,
            tools TEXT,
            estimated_time TEXT,
            estimated_cost TEXT,
            safety_warnings TEXT,
            confidence INTEGER,
            success_rate INTEGER,
            repair_count INTEGER,
            e_waste_kg_saved REAL,
            money_saved REAL,
            mentor_verified INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS repairs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            case_id TEXT,
            technician_name TEXT,
            status TEXT,
            notes TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_name TEXT,
            phone TEXT,
            issue TEXT,
            appointment_time TEXT,
            estimated_price TEXT,
            status TEXT DEFAULT 'Confirmed',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    for c in CASES:
        cursor.execute('''
            INSERT OR REPLACE INTO cases (
                id, title, category, category_name, difficulty, language, technician,
                symptom, probable_cause, fix_steps, decision_tree, parts, tools,
                estimated_time, estimated_cost, safety_warnings, confidence,
                success_rate, repair_count, e_waste_kg_saved, money_saved, mentor_verified
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            c['id'], c['title'], c['category'], c['category_name'], c['difficulty'], c['language'],
            json.dumps(c['technician'], ensure_ascii=False),
            c['symptom'], c['probable_cause'],
            json.dumps(c['fix_steps'], ensure_ascii=False),
            json.dumps(c['decision_tree'], ensure_ascii=False),
            json.dumps(c['parts'], ensure_ascii=False),
            json.dumps(c['tools'], ensure_ascii=False),
            c['estimated_time'], c['estimated_cost'],
            json.dumps(c['safety_warnings'], ensure_ascii=False),
            c['confidence'], c['success_rate'], c['repair_count'],
            c['e_waste_kg_saved'], c['money_saved'],
            1 if c['mentor_verified'] else 0
        ))
    conn.commit()
    conn.close()

    with open(JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(CASES, f, ensure_ascii=False, indent=2)

    print(f"Successfully initialized DB ({len(CASES)} cases) at {DB_PATH}")
    print(f"Successfully saved JSON mirror at {JSON_PATH}")

if __name__ == "__main__":
    init_db()
