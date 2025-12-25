import { Product, Category } from '../types/product';

export const categories: Category[] = [
  {
    id: 'urology',
    name: 'Urology',
    description: 'Advanced urological equipment and surgical instruments'
  },
  {
    id: 'plastic-surgery',
    name: 'Plastic Surgery',
    description: 'Precision tools for aesthetic and reconstructive procedures'
  },
  {
    id: 'orthopedic',
    name: 'Orthopedic',
    description: 'Comprehensive orthopedic surgical equipment and implants'
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    description: 'Cardiovascular diagnostic and therapeutic equipment'
  },
  {
    id: 'neurosurgery',
    name: 'Neurosurgery',
    description: 'Specialized neurosurgical instruments and systems'
  }
];

export const products: Product[] = [
  // Urology Products (10 products)
  {
    id: 'uro-001',
    name: 'Digital Cystoscope System',
    description: 'High-definition imaging system for bladder examination with 4K resolution and advanced light source',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500',
    additionalImages: [
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500',
      'https://images.unsplash.com/photo-1581093458791-9d42e91d9f8f?w=500',
      'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=500'
    ],
    detailedExplanation: 'The Digital Cystoscope System represents the latest advancement in urological endoscopy. Featuring state-of-the-art 4K imaging technology, this system provides unprecedented clarity and detail during bladder examinations. The advanced LED light source with color enhancement technology ensures optimal visualization of tissue structures, making it easier to identify abnormalities and perform accurate diagnoses. The ergonomic design reduces surgeon fatigue during extended procedures, while the autoclavable construction ensures reliable sterilization between uses. Compatible with all standard video processors and documentation systems.',
    category: 'urology',
    specifications: [
      { label: 'Resolution', value: '4K UHD (3840 x 2160)' },
      { label: 'Light Source', value: 'LED with Color Enhancement' },
      { label: 'Working Length', value: '30cm' },
      { label: 'Field of View', value: '120 degrees' },
      { label: 'Sterilization', value: 'Autoclavable' }
    ]
  },
  {
    id: 'uro-002',
    name: 'Lithotripsy Machine',
    description: 'Extracorporeal shock wave system for non-invasive kidney stone treatment',
    imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500',
    additionalImages: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500',
      'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=500',
      'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=500'
    ],
    detailedExplanation: 'Our Lithotripsy Machine offers a non-invasive solution for kidney stone treatment using electromagnetic shock wave technology. The dual imaging system combines X-ray and ultrasound guidance for precise stone targeting, ensuring maximum effectiveness while minimizing damage to surrounding tissue. The adjustable pulse rate and energy levels allow for customized treatment protocols based on stone composition and size. Patient positioning is simplified with the ergonomic treatment table, and the intuitive touchscreen interface streamlines the treatment workflow.',
    category: 'urology',
    specifications: [
      { label: 'Energy Source', value: 'Electromagnetic' },
      { label: 'Max Energy Level', value: '120 mJ' },
      { label: 'Pulse Rate', value: '60-120 shocks/min' },
      { label: 'Imaging', value: 'Dual X-ray & Ultrasound' },
      { label: 'Power', value: '230V, 50/60Hz' }
    ]
  },
  {
    id: 'uro-003',
    name: 'Urodynamic Testing System',
    description: 'Complete diagnostic solution for bladder function assessment and urinary flow studies',
    imageUrl: 'https://images.unsplash.com/photo-1581093458791-9d42e91d9f8f?w=500',
    category: 'urology',
    specifications: [
      { label: 'Channels', value: '4 Pressure + 2 Flow' },
      { label: 'Pressure Range', value: '0-300 cmH2O' },
      { label: 'Flow Range', value: '0-99 mL/s' },
      { label: 'Software', value: 'Windows-based Analysis' },
      { label: 'Display', value: '15" Touchscreen' }
    ]
  },
  {
    id: 'uro-004',
    name: 'Resectoscope Set',
    description: 'Precision instruments for transurethral resection procedures with monopolar/bipolar options',
    imageUrl: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=500',
    category: 'urology',
    specifications: [
      { label: 'Type', value: 'Monopolar & Bipolar' },
      { label: 'Sheath Size', value: '24-28 Fr' },
      { label: 'Working Element', value: 'Continuous Flow' },
      { label: 'Loop Types', value: 'Standard, Vaporizing, Roller' },
      { label: 'Material', value: 'Stainless Steel' }
    ]
  },
  {
    id: 'uro-005',
    name: 'Flexible Ureteroscope',
    description: 'Advanced flexible endoscope for upper urinary tract visualization and stone management',
    imageUrl: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=500',
    category: 'urology',
    specifications: [
      { label: 'Deflection', value: '270° up/down' },
      { label: 'Working Channel', value: '3.6 Fr' },
      { label: 'Distal Tip', value: '6.9 Fr' },
      { label: 'Working Length', value: '67 cm' },
      { label: 'Imaging', value: 'Digital CMOS Sensor' }
    ]
  },
  {
    id: 'uro-006',
    name: 'Laser Fiber System',
    description: 'Holmium laser fibers for stone fragmentation and soft tissue procedures',
    imageUrl: 'https://images.unsplash.com/photo-1581093804475-577d72e38aa0?w=500',
    category: 'urology'
  },
  {
    id: 'uro-007',
    name: 'Prostate Biopsy Kit',
    description: 'Complete set with ultrasound-guided needles for transrectal prostate sampling',
    imageUrl: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=500',
    category: 'urology'
  },
  {
    id: 'uro-008',
    name: 'Urology OR Table',
    description: 'Specialized surgical table with lithotomy positioning and C-arm compatibility',
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500',
    category: 'urology'
  },
  {
    id: 'uro-009',
    name: 'Catheter Collection System',
    description: 'Comprehensive range of urinary catheters and drainage systems',
    imageUrl: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=500',
    category: 'urology'
  },
  {
    id: 'uro-010',
    name: 'Video Tower System',
    description: 'Complete endoscopy tower with camera, light source, and recording capabilities',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500',
    category: 'urology'
  },

  // Plastic Surgery Products (10 products)
  {
    id: 'ps-001',
    name: 'Micro-Surgery Instrument Set',
    description: 'Precision titanium instruments for delicate reconstructive procedures and microsurgery',
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=500',
    category: 'plastic-surgery'
  },
  {
    id: 'ps-002',
    name: 'Liposuction System',
    description: 'Advanced power-assisted liposuction device with tumescent fluid management',
    imageUrl: 'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=500',
    category: 'plastic-surgery'
  },
  {
    id: 'ps-003',
    name: 'Dermabrasion Unit',
    description: 'Professional-grade skin resurfacing system for scar revision and facial rejuvenation',
    imageUrl: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=500',
    category: 'plastic-surgery'
  },
  {
    id: 'ps-004',
    name: 'Breast Implant Sizers',
    description: 'Complete range of anatomical and round sizers for augmentation planning',
    imageUrl: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=500',
    category: 'plastic-surgery'
  },
  {
    id: 'ps-005',
    name: 'Surgical Loupes & Headlight',
    description: 'High-magnification optical system with LED illumination for enhanced visualization',
    imageUrl: 'https://images.unsplash.com/photo-1581093458791-9d42e91d9f8f?w=500',
    category: 'plastic-surgery'
  },
  {
    id: 'ps-006',
    name: 'RF Skin Tightening Device',
    description: 'Radiofrequency energy system for non-invasive skin tightening and contouring',
    imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500',
    category: 'plastic-surgery'
  },
  {
    id: 'ps-007',
    name: 'Facelift Retractor Set',
    description: 'Specialized retractors and hooks for facial aesthetic surgery procedures',
    imageUrl: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=500',
    category: 'plastic-surgery'
  },
  {
    id: 'ps-008',
    name: 'Tissue Expander System',
    description: 'Complete range of tissue expanders for breast and skin reconstruction',
    imageUrl: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=500',
    category: 'plastic-surgery'
  },
  {
    id: 'ps-009',
    name: 'Laser Tattoo Removal',
    description: 'Q-switched laser system for effective tattoo and pigmentation removal',
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500',
    category: 'plastic-surgery'
  },
  {
    id: 'ps-010',
    name: 'Endoscopic Brow Lift Kit',
    description: 'Complete endoscopic instruments for minimally invasive forehead rejuvenation',
    imageUrl: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=500',
    category: 'plastic-surgery'
  },

  // Orthopedic Products (11 products)
  {
    id: 'orth-001',
    name: 'Total Knee Replacement System',
    description: 'Complete implant system with anatomical design and multiple sizing options',
    imageUrl: 'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=500',
    category: 'orthopedic'
  },
  {
    id: 'orth-002',
    name: 'Spinal Fixation Set',
    description: 'Comprehensive pedicle screw and rod system for spinal stabilization procedures',
    imageUrl: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=500',
    category: 'orthopedic'
  },
  {
    id: 'orth-003',
    name: 'Arthroscopy Tower',
    description: 'Complete arthroscopic system with HD camera, pump, and shaver console',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500',
    category: 'orthopedic'
  },
  {
    id: 'orth-004',
    name: 'Trauma Plating System',
    description: 'Locking plate and screw sets for fracture fixation in all anatomical regions',
    imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500',
    category: 'orthopedic'
  },
  {
    id: 'orth-005',
    name: 'Hip Replacement System',
    description: 'Modular hip prosthesis with cementless and cemented fixation options',
    imageUrl: 'https://images.unsplash.com/photo-1581093458791-9d42e91d9f8f?w=500',
    category: 'orthopedic'
  },
  {
    id: 'orth-006',
    name: 'Intramedullary Nailing Set',
    description: 'Complete IM nail system for long bone fracture treatment with targeting guides',
    imageUrl: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=500',
    category: 'orthopedic'
  },
  {
    id: 'orth-007',
    name: 'Power Tool System',
    description: 'Battery-powered surgical drill and saw with multiple attachments',
    imageUrl: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=500',
    category: 'orthopedic'
  },
  {
    id: 'orth-008',
    name: 'External Fixation System',
    description: 'Modular external fixator for complex fractures and limb lengthening',
    imageUrl: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=500',
    category: 'orthopedic'
  },
  {
    id: 'orth-009',
    name: 'Shoulder Arthroplasty Set',
    description: 'Anatomical and reverse shoulder replacement system with glenoid components',
    imageUrl: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=500',
    category: 'orthopedic'
  },
  {
    id: 'orth-010',
    name: 'Cast and Splint Materials',
    description: 'Comprehensive range of fiberglass and plaster casting materials',
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500',
    category: 'orthopedic'
  },
  {
    id: 'orth-011',
    name: 'Bone Cement Mixing System',
    description: 'Vacuum mixing and delivery system for polymethyl methacrylate bone cement',
    imageUrl: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=500',
    category: 'orthopedic'
  },

  // Cardiology Products (10 products)
  {
    id: 'card-001',
    name: 'ECG Machine 12-Lead',
    description: 'Digital electrocardiograph with interpretation software and wireless connectivity',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500',
    category: 'cardiology'
  },
  {
    id: 'card-002',
    name: 'Cardiac Monitor',
    description: 'Multi-parameter patient monitor with ECG, SpO2, NIBP, and temperature',
    imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500',
    category: 'cardiology'
  },
  {
    id: 'card-003',
    name: 'Echocardiography System',
    description: 'Advanced ultrasound system with 4D imaging and strain analysis capabilities',
    imageUrl: 'https://images.unsplash.com/photo-1581093458791-9d42e91d9f8f?w=500',
    category: 'cardiology'
  },
  {
    id: 'card-004',
    name: 'Defibrillator AED',
    description: 'Automated external defibrillator with real-time CPR feedback technology',
    imageUrl: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=500',
    category: 'cardiology'
  },
  {
    id: 'card-005',
    name: 'Stress Test System',
    description: 'Complete cardiac stress testing solution with treadmill and monitoring',
    imageUrl: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=500',
    category: 'cardiology'
  },
  {
    id: 'card-006',
    name: 'Holter Monitor',
    description: '24-48 hour ambulatory ECG recorder for arrhythmia detection',
    imageUrl: 'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=500',
    category: 'cardiology'
  },
  {
    id: 'card-007',
    name: 'Cath Lab Table',
    description: 'Radiolucent table system for cardiac catheterization procedures',
    imageUrl: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=500',
    category: 'cardiology'
  },
  {
    id: 'card-008',
    name: 'Angiography System',
    description: 'Digital subtraction angiography with flat panel detector technology',
    imageUrl: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=500',
    category: 'cardiology'
  },
  {
    id: 'card-009',
    name: 'IABP Console',
    description: 'Intra-aortic balloon pump for mechanical circulatory support',
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500',
    category: 'cardiology'
  },
  {
    id: 'card-010',
    name: 'Pacemaker Programmer',
    description: 'Universal programmer for interrogation and programming of cardiac devices',
    imageUrl: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=500',
    category: 'cardiology'
  },

  // Neurosurgery Products (10 products)
  {
    id: 'neuro-001',
    name: 'Operating Microscope',
    description: 'High-magnification surgical microscope with fluorescence and 3D visualization',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500',
    category: 'neurosurgery'
  },
  {
    id: 'neuro-002',
    name: 'Cranial Fixation System',
    description: 'Complete set of plates, screws, and mesh for cranial reconstruction',
    imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500',
    category: 'neurosurgery'
  },
  {
    id: 'neuro-003',
    name: 'Neuronavigation System',
    description: 'Image-guided surgery platform with real-time tracking and registration',
    imageUrl: 'https://images.unsplash.com/photo-1581093458791-9d42e91d9f8f?w=500',
    category: 'neurosurgery'
  },
  {
    id: 'neuro-004',
    name: 'Ultrasonic Aspirator',
    description: 'CUSA tissue removal system for precise tumor resection and debulking',
    imageUrl: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=500',
    category: 'neurosurgery'
  },
  {
    id: 'neuro-005',
    name: 'Cranial Drill System',
    description: 'High-speed pneumatic drill with perforators and craniotomy bits',
    imageUrl: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=500',
    category: 'neurosurgery'
  },
  {
    id: 'neuro-006',
    name: 'ICP Monitor',
    description: 'Intracranial pressure monitoring system with fiber-optic sensors',
    imageUrl: 'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=500',
    category: 'neurosurgery'
  },
  {
    id: 'neuro-007',
    name: 'Neurosurgical Instrument Set',
    description: 'Comprehensive tray of micro-instruments for cranial and spinal procedures',
    imageUrl: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=500',
    category: 'neurosurgery'
  },
  {
    id: 'neuro-008',
    name: 'Bipolar Forceps',
    description: 'Precision coagulation forceps with irrigation for hemostasis',
    imageUrl: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=500',
    category: 'neurosurgery'
  },
  {
    id: 'neuro-009',
    name: 'Stereotactic Frame',
    description: 'Leksell-style frame for precise targeting in functional neurosurgery',
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500',
    category: 'neurosurgery'
  },
  {
    id: 'neuro-010',
    name: 'Endoscope System',
    description: 'Rigid neuroendoscope with HD camera for minimally invasive procedures',
    imageUrl: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=500',
    category: 'neurosurgery'
  }
];