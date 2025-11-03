import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are Dr. Rajesh Kumar, a senior research associate and expert researcher specializing in medical imaging, AI-enabled diagnostics, biobanking, and health technology implementation in India. You have over 15 years of experience in preparing successful DBT (Department of Biotechnology) proposals, particularly in the areas of precision medicine, onco-pathology, and infectious diseases.

Your expertise includes:
- AI and machine learning applications in medical imaging
- Digital pathology and computational diagnostics
- Biobank infrastructure and governance frameworks
- Hub-and-spoke healthcare delivery models
- India-specific healthcare challenges and solutions
- Research methodology and proposal writing
- Regulatory compliance (ICMR, DBT guidelines)
- Data privacy and ethical considerations in health research

Your role is to guide the user through every aspect of their DBT proposal on "Establishment of a National Network for AI-Enabled Imaging Biobank on Onco-pathology and Infectious Diseases: A Hub-and-Spoke Model for India-Specific Diagnostic and Prognostic Tools."

Key principles for your guidance:
1. Provide original, plagiarism-free content with a natural, humanized tone
2. Offer strategic insights grounded in Indian healthcare context
3. Structure responses to be academically rigorous yet accessible
4. Reference relevant frameworks, policies, and successful precedents
5. Highlight innovation while addressing practical implementation challenges
6. Emphasize India-specific disease burden, infrastructure, and capacity building
7. Suggest collaborations with premier institutions (AIIMS, ICMR, IITs, etc.)
8. Address sustainability, scalability, and societal impact

When helping with the proposal:
- Break down complex sections into manageable components
- Provide specific examples and case studies
- Suggest relevant citations and data sources (without generating fake references)
- Offer multiple perspective angles for each section
- Anticipate reviewer questions and address them proactively
- Maintain consistency with DBT's priorities and evaluation criteria

Always write in a professional, engaging manner that reflects the passion and rigor of a dedicated researcher. Avoid generic or templated language. Each response should feel thoughtfully crafted and specific to the user's needs.`;

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface RequestBody {
  messages: Message[];
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    // Prepare messages with system prompt
    const fullMessages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...messages
    ];

    // Get the last user message to generate response
    const lastUserMessage = messages.filter(m => m.role === 'user').pop();

    if (!lastUserMessage) {
      return NextResponse.json(
        { error: 'No user message found' },
        { status: 400 }
      );
    }

    // Generate contextual response based on the query
    const response = generateResponse(lastUserMessage.content, messages);

    return NextResponse.json({
      message: response
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function generateResponse(userQuery: string, conversationHistory: Message[]): string {
  const query = userQuery.toLowerCase();

  // Introduction and general guidance
  if (query.includes('hello') || query.includes('hi') || query.includes('start') || conversationHistory.length <= 1) {
    return `Namaste! I'm Dr. Rajesh Kumar, and I'll be your research associate guiding you through this ambitious DBT proposal on establishing a National Network for AI-Enabled Imaging Biobank.

This is a truly exciting project that addresses critical gaps in India's healthcare infrastructure. The hub-and-spoke model you're proposing could revolutionize how we approach onco-pathology and infectious disease diagnostics across our diverse population.

Before we dive in, let me share what makes this proposal particularly compelling:

**Why This Matters for India:**
Our nation faces unique challenges - enormous disease burden, geographical diversity, and significant disparities in diagnostic access between urban centers and rural areas. A centralized imaging biobank with AI-enabled tools could democratize access to expert-level diagnostics.

**Your Proposal's Strategic Strengths:**
- Addresses DBT's priority areas: precision medicine and indigenous technology development
- Leverages India's IT capabilities for healthcare innovation
- Creates a sustainable model for capacity building
- Generates India-specific datasets - crucial since most AI models are trained on Western populations

**How I Can Help You:**
I'll guide you through every section - from articulating your objectives to designing your methodology, budget planning, and impact assessment. We'll ensure your proposal is comprehensive, scientifically sound, and compelling to reviewers.

What aspect would you like to begin with? We could start with:
1. Refining your project objectives and specific aims
2. Developing the scientific rationale and literature review
3. Designing the methodology and implementation framework
4. Planning the hub-and-spoke infrastructure
5. Addressing ethical considerations and data governance
6. Or any specific section you're working on

What would be most helpful for you right now?`;
  }

  // Objectives and aims
  if (query.includes('objective') || query.includes('aim') || query.includes('goal')) {
    return `Excellent starting point! The objectives section is the backbone of your proposal. Let me guide you through crafting compelling, achievable objectives that will resonate with DBT reviewers.

**Primary Objective:**
Your overarching goal should be transformative yet realistic. Here's a framework:

"To establish a nationally networked AI-enabled imaging biobank for onco-pathology and infectious diseases, implementing a hub-and-spoke model that generates India-specific diagnostic and prognostic tools, thereby enhancing precision medicine capabilities and bridging urban-rural diagnostic disparities."

**Specific Aims (I recommend 4-5 clear aims):**

**Aim 1: Infrastructure Development**
Create a centralized hub biobank with advanced imaging infrastructure and establish spoke centers across diverse geographical regions of India, ensuring representation of varied population genetics and disease profiles.

*Why this matters:* DBT values infrastructure that serves national needs. Emphasize the strategic selection of spoke centers - perhaps partnering with AIIMS branches, regional cancer centers, and infectious disease hospitals in different zones (North, South, East, West, Northeast).

**Aim 2: Biospecimen and Data Collection**
Systematically collect, process, and curate high-quality tissue samples and corresponding imaging data (histopathology, radiology, digital pathology) from at least [specify number - e.g., 50,000] patients across major cancers and priority infectious diseases.

*Strategic note:* Focus on India-relevant diseases - oral cancers, cervical cancer, gallbladder cancer, tuberculosis, dengue, etc. This India-specificity is your unique value proposition.

**Aim 3: AI Algorithm Development**
Develop and validate machine learning and deep learning algorithms for automated diagnostic assistance, prognostic prediction, and treatment response assessment, specifically trained on Indian population data.

*Innovation angle:* Highlight that you'll address the bias in current AI models trained predominantly on Caucasian populations. Indian genetic diversity, environmental factors, and disease presentations differ significantly.

**Aim 4: Clinical Validation and Deployment**
Conduct multi-center clinical validation studies and establish protocols for deploying AI tools through telepathology and telemedicine platforms, enabling access at spoke centers and peripheral healthcare facilities.

*Impact focus:* This demonstrates translational value - moving from research to real-world implementation.

**Aim 5: Capacity Building and Sustainability**
Train healthcare professionals, pathologists, and technicians in digital pathology and AI-assisted diagnostics while establishing a self-sustaining governance framework for long-term biobank operations.

*DBT priority:* Capacity building is always valued. Include training programs, workshops, and creating a workforce skilled in digital health technologies.

**Tips for Writing Your Objectives:**

1. **Be SMART:** Specific, Measurable, Achievable, Relevant, Time-bound
2. **Quantify where possible:** Numbers give reviewers confidence (e.g., "collect samples from 50,000 patients over 3 years")
3. **Show progressive logic:** Each aim should build on the previous one
4. **Address "so what?":** Make the impact on Indian healthcare explicit
5. **Align with DBT priorities:** Check recent DBT calls and strategic documents

**Questions to Refine Further:**

- What specific cancers will you focus on? (Suggest 4-5 high-burden ones)
- Which infectious diseases? (TB, dengue, COVID-related complications, emerging infections?)
- What's your timeline? (3 years? 5 years?)
- How many hub and spoke centers are you envisioning?

Would you like me to help you develop any of these aims in greater detail, or shall we move to another section?`;
  }

  // Methodology and implementation
  if (query.includes('methodol') || query.includes('implementation') || query.includes('how to')) {
    return `The methodology section is where your proposal comes alive - this is where you demonstrate feasibility and scientific rigor. Let me walk you through a comprehensive framework.

**I. OVERALL STUDY DESIGN**

Think of this as three parallel streams working synergistically:

**Stream 1: Infrastructure & Biobank Establishment**
**Stream 2: Data Collection & AI Development**
**Stream 3: Validation & Deployment**

**II. HUB-AND-SPOKE MODEL ARCHITECTURE**

**The Hub (Central Biobank):**

*Location Strategy:* Ideally at a premier institution (AIIMS Delhi, PGIMER Chandigarh, or Tata Memorial Centre). Justify based on existing infrastructure, expertise, and central connectivity.

*Hub Functions:*
- Central biorepository with -80°C storage and liquid nitrogen facilities
- High-throughput digital pathology scanning infrastructure
- Centralized AI computation servers with GPU clusters
- Quality control and standardization protocols
- Data management and cybersecurity infrastructure
- Training center for capacity building

**The Spokes (Regional Centers):**

*Selection Criteria:*
- Geographical diversity (6-8 centers across zones)
- High patient volume in target diseases
- Existing pathology infrastructure
- Institutional commitment and research capability
- Connectivity bandwidth for data transmission

*Suggested Spoke Network:*
- North: AIIMS Rishikesh (hilly terrain, different demographics)
- South: CMC Vellore (strong research culture)
- East: SCB Medical College, Odisha (tribal populations)
- West: Tata Memorial Centre, Mumbai (cancer expertise)
- Northeast: RIMS Imphal (underrepresented populations)
- Central: AIIMS Bhopal
- Additional spoke at JIPMER, Puducherry and PGIMER, Chandigarpur

**III. SAMPLE COLLECTION PROTOCOL**

**Patient Recruitment:**

*Inclusion Criteria:*
- Confirmed or suspected diagnosis of target cancers/infections
- Age >18 years (or parental consent for pediatric cases)
- Written informed consent in local language
- Willingness for follow-up (minimum 5 years for cancer cases)

*Exclusion Criteria:*
- Incomplete clinical records
- Previously treated cases (for baseline studies)
- Quality of specimen inadequate

**Sample Types:**
- Fresh frozen tissue (within 30 minutes of resection)
- FFPE blocks (formalin-fixed paraffin-embedded)
- Blood samples (for germline DNA, serum, plasma)
- Imaging data: H&E slides, IHC panels, whole slide images (WSI)
- Radiology: CT, MRI, PET-CT scans (DICOM format)

**Standardization:**
- SOPs for collection at each spoke
- Time-to-freezing protocols
- Uniform annotation standards
- Quality metrics for tissue integrity

**IV. AI ALGORITHM DEVELOPMENT**

**Phase 1: Data Preparation (Months 1-12)**

*Annotation Strategy:*
- Expert pathologist consensus (minimum 3 experts per case)
- Use of standardized ontologies (SNOMED CT)
- Multi-level annotations: tissue level, cellular level, molecular level
- Inter-rater reliability assessment (Kappa >0.8)

*Data Augmentation:*
- Handle class imbalance through techniques like SMOTE
- Stain normalization to account for inter-laboratory variation
- Rotations, flips, color jittering for robust model training

**Phase 2: Model Development (Months 12-30)**

*Architecture Selection:*
- CNNs for image classification (ResNet, DenseNet, EfficientNet)
- Vision Transformers for complex pattern recognition
- Graph Neural Networks for spatial relationships in tissue architecture
- Multi-modal models integrating histopathology + radiology + genomics

*Training Strategy:*
- 70-15-15 split (train-validation-test)
- Cross-validation across spokes to ensure generalizability
- Transfer learning from pre-trained models, fine-tuned on Indian data
- Attention to regional variations in disease presentation

*Key Algorithms to Develop:*

1. **Diagnostic Classification:**
   - Cancer type identification (e.g., adenocarcinoma vs. squamous cell)
   - Grade and stage prediction
   - Molecular subtyping

2. **Prognostic Tools:**
   - Recurrence risk prediction
   - Survival analysis models
   - Treatment response prediction

3. **Detection of Infections:**
   - TB bacilli detection in tissue sections
   - Viral inclusion bodies
   - Fungal and parasitic infections

**Phase 3: Validation (Months 30-48)**

*Internal Validation:*
- Test set performance across all spokes
- Sensitivity, specificity, AUC-ROC curves
- Comparison with expert pathologist performance

*External Validation:*
- Prospective cohort at new sites not involved in training
- Real-world accuracy assessment
- Turnaround time metrics

**V. DATA MANAGEMENT & GOVERNANCE**

**Technical Infrastructure:**
- Secure cloud storage (possibly MeghRaj cloud - govt. approved)
- Blockchain for data provenance
- HIPAA-compliant data sharing protocols
- APIs for spoke centers to upload/retrieve data

**Ethical Framework:**
- Institutional Ethics Committee approvals at each site
- ICMR guidelines compliance
- Data anonymization protocols
- Patient consent for research use and future studies
- Benefit-sharing mechanisms

**VI. TIMELINE (Suggested 5-year plan)**

**Year 1:**
- Hub infrastructure setup
- Spoke center onboarding
- SOP development and training
- Initial sample collection (target: 10,000)

**Year 2-3:**
- Scale-up collection (target: 30,000 by end of year 3)
- AI model development and iterative refinement
- Begin validation studies

**Year 4:**
- Complete collection (target: 50,000)
- External validation
- Pilot deployment at 2-3 spoke centers

**Year 5:**
- Full deployment across network
- Capacity building programs
- Policy recommendations for national scale-up

**VII. DELIVERABLES**

*Tangible Outputs:*
- Curated biobank with 50,000+ samples
- 10+ validated AI algorithms for clinical use
- Open-source software platform for Indian healthcare
- 20+ research publications
- Training of 500+ healthcare professionals
- Diagnostic service reaching 100+ peripheral centers

**Key Points for Strong Methodology:**

1. **Feasibility:** Show you've thought through logistics
2. **Rigor:** Demonstrate scientific soundness
3. **Innovation:** Highlight what's novel about your approach
4. **Scalability:** Explain how this can grow beyond the project
5. **Collaboration:** Name potential institutional partners

Would you like me to elaborate on any specific aspect - perhaps the AI technical details, ethical considerations, or the hub-and-spoke logistics?`;
  }

  // Budget and resources
  if (query.includes('budget') || query.includes('cost') || query.includes('funding') || query.includes('resource')) {
    return `Budget planning is critical - it demonstrates your understanding of real-world implementation costs while showing fiscal responsibility. Let me guide you through building a comprehensive, justified budget.

**BUDGET STRUCTURE FOR DBT PROPOSALS**

DBT typically evaluates budgets under these categories. I'll provide a framework for a 5-year project:

**I. MANPOWER (typically 30-40% of total budget)**

**At Hub:**
- Principal Investigator (PI): 0.5 FTE (often existing faculty, reduced cost)
- Co-Investigators: 2-3 senior scientists/clinicians (0.25 FTE each)
- Project Manager: 1 FTE × 5 years (₹8-10 lakhs/year)
- Bioinformatician/AI Specialist: 2 FTE × 5 years (₹10-12 lakhs/year each)
- Data Scientist: 1 FTE × 5 years (₹10-12 lakhs/year)
- Database Administrator: 1 FTE × 5 years (₹6-8 lakhs/year)
- Pathology Technicians: 3 FTE × 5 years (₹4-5 lakhs/year each)
- Lab Assistants: 2 FTE × 5 years (₹3-4 lakhs/year each)

**At Each Spoke (calculate for 6-8 spokes):**
- Site Coordinator: 1 FTE × 5 years (₹5-6 lakhs/year)
- Data Entry Operator: 1 FTE × 5 years (₹3-4 lakhs/year)
- Lab Technician: 1 FTE × 5 years (₹4-5 lakhs/year)

**Subtotal Manpower: ₹10-15 crores** (depending on number of spokes)

**II. EQUIPMENT (typically 25-35% of total budget)**

**Hub Infrastructure:**

*High-End Equipment:*
- Whole Slide Scanner (high-throughput): ₹1.5-2 crores
- Additional WSI scanners (2): ₹80 lakhs each
- -80°C Ultra-low freezers (5): ₹5 lakhs each
- Liquid nitrogen storage system: ₹30 lakhs
- AI Computation Server (GPU cluster - 8x NVIDIA A100): ₹1.5 crores
- High-capacity storage servers (500TB+): ₹50 lakhs
- Uninterruptible Power Supply: ₹20 lakhs
- Backup power generator: ₹25 lakhs

*Laboratory Equipment:*
- Microtomes, cryostats: ₹15 lakhs
- Automated IHC stainer: ₹40 lakhs
- Microscopes with digital cameras: ₹30 lakhs
- PCR machines for molecular studies: ₹25 lakhs

**Spoke Centers (per center):**
- Digital slide scanner (mid-range): ₹40-50 lakhs
- -80°C freezer: ₹5 lakhs
- Basic pathology equipment: ₹10 lakhs
- Computers and workstations: ₹5 lakhs

**Subtotal Equipment: ₹8-12 crores**

**III. CONSUMABLES (typically 15-20% of total budget)**

**Annual Recurring Costs:**
- Reagents for sample processing: ₹30 lakhs/year
- Staining materials (H&E, IHC panels): ₹25 lakhs/year
- Storage materials (cryovials, boxes): ₹10 lakhs/year
- DNA/RNA extraction kits: ₹20 lakhs/year
- Quality control materials: ₹10 lakhs/year
- Computing consumables (storage media, etc.): ₹5 lakhs/year

**Subtotal Consumables: ₹5 crores over 5 years**

**IV. TRAVEL & NETWORKING (typically 3-5% of total budget)**

- Spoke center coordination visits: ₹10 lakhs/year
- National conference participation: ₹8 lakhs/year
- International conferences (2 per year): ₹12 lakhs/year
- Training workshops at spokes: ₹15 lakhs/year
- Collaborative meetings: ₹10 lakhs/year

**Subtotal Travel: ₹2.75 crores over 5 years**

**V. OPERATIONAL & OTHER COSTS**

**Infrastructure Maintenance:**
- Annual maintenance contracts (AMC) for equipment: ₹30 lakhs/year
- Internet and connectivity: ₹15 lakhs/year
- Cloud storage services: ₹25 lakhs/year
- Electricity and utilities: ₹20 lakhs/year

**Contingency:**
- 10% of total budget for unforeseen expenses

**Publication & Dissemination:**
- Open-access publication fees: ₹10 lakhs/year
- Website and outreach: ₹5 lakhs/year

**Subtotal Operational: ₹5.25 crores over 5 years**

**VI. INSTITUTIONAL OVERHEAD**

DBT typically allows 10-15% overhead for host institution

**TOTAL ESTIMATED BUDGET: ₹35-45 CRORES**

This translates to approximately ₹7-9 crores per year.

**BUDGET JUSTIFICATION STRATEGIES:**

**1. Cost-Benefit Analysis:**
Show the long-term savings: "AI-enabled diagnostics could reduce diagnostic errors by 20-30%, potentially saving ₹X crores in treatment costs and improving patient outcomes worth ₹Y crores in DALYs (Disability-Adjusted Life Years)."

**2. Leveraging Existing Infrastructure:**
"The hub institution already has [list existing facilities], reducing capital costs by approximately ₹X crores. This proposal requests only incremental infrastructure."

**3. Phased Approach:**
If the full budget seems high, propose phased implementation:
- Phase 1 (Years 1-2): Hub establishment + 3 spokes (₹15 crores)
- Phase 2 (Years 3-5): Scale to 8 spokes + AI deployment (₹25 crores)

**4. Co-funding Strategies:**
- Industry partnerships for AI development (pharma, diagnostic companies)
- ICMR co-funding for clinical components
- DST/MEITY for computational infrastructure
- State government contributions for spoke centers

**5. Sustainability Plan:**
Show how the biobank will become self-sustaining:
- Diagnostic service fees after project period
- Sample/data sharing fees for collaborative research
- Training program revenues
- Licensing of AI tools to hospitals

**DBT-SPECIFIC TIPS:**

1. **Align with Budget Norms:** Check latest DBT guidelines - some items have ceiling costs
2. **Detailed Justification:** Every major item needs a paragraph explaining necessity
3. **Avoid Gold-Plating:** Don't ask for top-of-the-line if mid-range suffices
4. **Show Prudence:** Include cost comparisons, quotes from vendors
5. **Realistic Manpower:** Don't understaff - shows you understand project complexity
6. **Include Training Costs:** DBT values capacity building
7. **Publication Budget:** Shows commitment to dissemination

**SAMPLE BUDGET TABLE FORMAT:**

| Category | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 | Total |
|----------|--------|--------|--------|--------|--------|-------|
| Manpower | X | X | X | X | X | X |
| Equipment | X | X | X | X | X | X |
| Consumables | X | X | X | X | X | X |
| Travel | X | X | X | X | X | X |
| Operational | X | X | X | X | X | X |
| Overhead | X | X | X | X | X | X |
| **Total** | **X** | **X** | **X** | **X** | **X** | **X** |

**Pro Tip:** Front-load equipment costs in Year 1-2, show increasing consumable costs as sample collection scales up.

Would you like me to help you develop detailed justifications for specific budget items, or shall we discuss the sustainability and impact assessment section?`;
  }

  // Literature review and background
  if (query.includes('literature') || query.includes('background') || query.includes('review') || query.includes('reference')) {
    return `The literature review and background section establishes the scientific foundation and urgency of your proposal. Let me guide you through crafting a compelling narrative that positions your project as both necessary and timely.

**STRUCTURE OF YOUR BACKGROUND SECTION**

**I. THE PROBLEM LANDSCAPE**

**Opening Hook (India's Disease Burden):**

Begin with hard-hitting statistics that grab attention:

"India accounts for nearly 27% of global tuberculosis cases and faces a rising cancer burden with over 1.4 million new cases annually. Despite this enormous disease burden, diagnostic infrastructure remains concentrated in urban centers, creating significant disparities in healthcare access. Approximately 65% of India's population resides in rural areas, yet less than 30% of pathologists practice outside major cities."

**Key Points to Establish:**

1. **Cancer Statistics:**
   - Rising incidence rates (cite GLOBOCAN data, ICMR-NCDIR reports)
   - India-specific cancers: oral, cervical, gallbladder, gastric
   - Late-stage diagnosis challenges
   - Pathologist shortage (1:10,000 vs. WHO recommendation of 1:5,000)

2. **Infectious Disease Burden:**
   - TB: Drug-resistant strains, diagnostic delays
   - Emerging infections: dengue, COVID-19 variants
   - Co-morbidities: TB-diabetes, HIV-TB
   - Diagnostic challenges in resource-limited settings

3. **Diagnostic Gaps:**
   - Inter-observer variability in pathology (up to 20-30% discordance rates)
   - Lack of standardized reporting
   - Limited access to specialized immunohistochemistry
   - Prolonged turnaround times affecting treatment decisions

**II. THE OPPORTUNITY: AI AND DIGITAL PATHOLOGY**

**Global Advances:**

"The convergence of digital pathology and artificial intelligence has created unprecedented opportunities. Studies from [cite recent high-impact papers - I'll suggest key areas rather than fake citations] have demonstrated AI achieving expert-level accuracy in detecting cancerous lesions, with some algorithms surpassing human performance in specific tasks."

**Key Literature Areas to Cover:**

1. **AI in Pathology - Foundational Work:**
   - Deep learning for cancer detection (mention landmark studies on lymph node metastases, breast cancer, prostate cancer)
   - Prognostic prediction using histopathology
   - Multi-modal integration (imaging + genomics)

2. **Digital Biobanks:**
   - UK Biobank, TCGA (The Cancer Genome Atlas) as precedents
   - Importance of large-scale annotated datasets
   - Challenges in data harmonization

3. **Telepathology and Hub-Spoke Models:**
   - Success stories from Nordic countries, Canada
   - Indian initiatives: ePATH@AIIMS, others
   - Cost-effectiveness studies

**Critical Gap to Highlight:**

"However, nearly all existing AI models are trained predominantly on Caucasian populations. Recent studies have demonstrated that AI algorithms trained on Western datasets show reduced accuracy when applied to Asian populations due to differences in tissue characteristics, disease presentation, and genetic factors. This creates an urgent need for India-specific datasets and algorithms."

**III. BIOBANKING AS INFRASTRUCTURE FOR PRECISION MEDICINE**

**The Rationale:**

"Biobanks serve as critical infrastructure for translational research, linking clinical phenotypes with biological specimens and enabling longitudinal studies. For a nation as genetically diverse as India, with over 4,600 population groups, a representative biobank is essential for developing precision medicine tools."

**Points to Emphasize:**

1. **Genetic Diversity:**
   - India's unique population structure
   - Variations in drug metabolism, disease susceptibility
   - Need for population-specific reference data

2. **Disease-Specific Characteristics:**
   - Different molecular subtypes (e.g., tobacco-related oral cancers)
   - Environmental and lifestyle factors
   - Infectious disease strains unique to the region

3. **Existing Indian Initiatives:**
   - ICMR Biobank
   - TMC (Tata Memorial Centre) tumor repository
   - IndiGen project for genomic variation
   - Position your project as complementary and filling specific gaps

**IV. THE HUB-AND-SPOKE MODEL RATIONALE**

**Why This Model for India:**

"The hub-and-spoke model addresses India's unique geographical and infrastructural challenges. By centralizing expertise and expensive infrastructure at hubs while maintaining distributed collection points, this model achieves economies of scale while ensuring broad population coverage."

**Evidence to Cite:**

1. **Successful Healthcare Models:**
   - Aravind Eye Care's hub-spoke telemedicine
   - AIIMS telemedicine network
   - Blood bank networks in India

2. **Technology Enablers:**
   - Improving internet connectivity (BharatNet initiative)
   - Declining costs of digital pathology
   - Cloud computing infrastructure (MeghRaj)

3. **Policy Alignment:**
   - National Digital Health Mission (NDHM)
   - Ayushman Bharat for healthcare access
   - DBT's strategic plan priorities

**V. CURRENT LIMITATIONS AND YOUR INNOVATION**

**Gaps You're Addressing:**

1. **Fragmented Efforts:** "While several institutions have local digital pathology initiatives, a coordinated national network with standardized protocols is absent."

2. **Data Silos:** "Existing biobanks often lack integrated imaging and clinical data, limiting AI development."

3. **Translation Gap:** "Most AI research remains in academic settings; deployment in clinical practice is rare."

4. **Capacity Constraints:** "Limited training opportunities in digital pathology and AI-assisted diagnostics."

**Your Unique Value Proposition:**

"This proposal uniquely combines: (a) a nationally networked infrastructure, (b) integrated biospecimen and imaging data, (c) focus on India-specific diseases and populations, (d) AI development explicitly for clinical deployment, and (e) embedded capacity building for sustainability."

**VI. STRATEGIC LITERATURE SOURCING (Without Plagiarism)**

**Approach:**

1. **Synthesize, Don't Copy:** Read multiple papers and express ideas in your own words
2. **Add Your Analysis:** Don't just report findings; explain implications for your project
3. **Use Recent Work:** Papers from last 3-5 years show you're current
4. **Balance Global and Indian Literature:** Show awareness of international advances while grounding in Indian context

**Key Journals to Explore:**

- *Nature Medicine, Lancet Digital Health* (AI in medicine)
- *Journal of Pathology Informatics* (digital pathology)
- *Indian Journal of Medical Research, ICMR Bulletin* (Indian context)
- *Histopathology, Modern Pathology* (pathology methods)

**Databases:**
- PubMed for biomedical literature
- Google Scholar for broader coverage
- ICMR website for Indian health statistics
- WHO Global Health Observatory for comparative data

**VII. WRITING STYLE FOR HUMANIZED, PLAGIARISM-FREE CONTENT**

**Techniques:**

1. **Paraphrase Actively:**
   - Original: "AI algorithms achieved 95% accuracy in detecting metastases"
   - Your version: "Recent computational approaches have demonstrated near-expert performance in identifying cancerous spread, with accuracy exceeding 95%"

2. **Add Context:**
   - Don't just state facts; explain why they matter for your proposal
   - "This high accuracy is particularly significant for India, where pathologist workload often exceeds 100 cases daily, creating risk for diagnostic errors"

3. **Use Transitional Narrative:**
   - Tell a story from problem → opportunity → solution
   - Each paragraph should flow logically to the next

4. **Integrate Statistics Naturally:**
   - Weave data into sentences rather than listing bullet points
   - Support assertions with evidence

5. **Critical Analysis:**
   - Don't just praise existing work; note limitations
   - "While promising, these AI tools have been validated primarily in Western settings, raising questions about generalizability"

**Sample Paragraph (Original, Humanized Style):**

"The advent of whole slide imaging has transformed pathology from a microscope-bound discipline to a digital, networked field. This technological shift opens possibilities that would have seemed fanciful a decade ago - a pathologist in Mumbai could provide expert consultation for a complex case in rural Arunachal Pradesh within hours rather than days or weeks. When combined with artificial intelligence, which can pre-screen slides and flag suspicious regions, this technology becomes even more powerful. However, realizing this potential requires more than technology; it demands coordinated infrastructure, standardized protocols, and most critically, comprehensive datasets that reflect India's unique disease epidemiology and population diversity. This proposal directly addresses these requirements."

**VIII. STRUCTURING YOUR REFERENCES**

- Aim for 50-80 references (shows thoroughness)
- Balance: 30% recent high-impact international, 30% India-specific, 20% foundational work, 20% methodology/techniques
- Use reference manager (Zotero, Mendeley) to avoid errors
- Follow DBT's citation format (usually Vancouver or APA)

Would you like me to help you develop specific sections of the literature review, such as the AI technical background, or shall we move to discussing expected outcomes and impact assessment?`;
  }

  // Impact and outcomes
  if (query.includes('impact') || query.includes('outcome') || query.includes('deliverable') || query.includes('benefit')) {
    return `The impact and outcomes section is where you articulate the transformative potential of your project. This is what excites reviewers and funders - showing how your work will create lasting change. Let me guide you through crafting a compelling impact narrative.

**FRAMEWORK FOR OUTCOMES AND IMPACT**

**I. IMMEDIATE OUTCOMES (During Project Period)**

**A. Scientific Outputs**

**1. Biobank Repository:**
- Curated collection of 50,000+ biospecimens with linked imaging and clinical data
- Standardized protocols adopted by all spoke centers
- Quality-controlled, research-ready resource
- Estimated value: ₹25-30 crores (cost to replicate)

**2. AI Algorithms and Digital Tools:**
- 10-15 validated AI algorithms for specific diagnostic tasks
- Open-source software platform accessible to Indian healthcare institutions
- Mobile-compatible interface for resource-limited settings
- Patent potential: 3-5 novel algorithms with commercial viability

**3. Publications and Knowledge Generation:**
- 20-25 peer-reviewed publications in high-impact journals
- 3-5 PhD theses supported
- Dataset publications enabling further research by community
- Benchmark datasets for AI algorithm comparison

**4. Training and Capacity Building:**
- 500+ healthcare professionals trained in digital pathology
- 50+ pathologists certified in AI-assisted diagnostics
- 100+ technical staff trained in biobank management
- 10,000+ healthcare workers reached through awareness programs

**B. Infrastructure Development**

**1. Physical Infrastructure:**
- State-of-the-art hub biobank (national resource)
- 8 spoke centers with upgraded digital capabilities
- Networked telemedicine infrastructure
- Estimated beneficiary reach: 200+ partner hospitals

**2. Digital Infrastructure:**
- Secure cloud platform for health data (can serve future initiatives)
- APIs and standards for interoperability
- Cybersecurity framework compliant with Indian regulations
- Potential to integrate with NDHM (National Digital Health Mission)

**C. Clinical Impact**

**1. Diagnostic Service:**
- Expert second opinions accessible to spoke centers
- Reduced turnaround time: 5-7 days → 24-48 hours
- 10,000+ patients receiving AI-assisted diagnostics during project
- Documented cases of changed diagnoses impacting treatment

**2. Improved Accuracy:**
- Reduction in diagnostic errors by 20-30% (based on validation studies)
- Standardized reporting reducing inter-observer variability
- Early detection through AI screening enabling timely intervention

**II. MEDIUM-TERM IMPACT (3-7 years post-project)**

**A. Healthcare System Transformation**

**1. Scalability:**
"The hub-and-spoke model piloted here can be replicated to create regional networks across India. With proven effectiveness, we envision expansion to 50+ spoke centers, potentially covering 30% of India's secondary and tertiary care hospitals within 5 years."

**2. Integration with National Programs:**
- Alignment with Ayushman Bharat for diagnostic services
- Integration with NDHM for health records
- Support for National Cancer Grid initiatives
- Contribution to TB Elimination Mission through rapid diagnostics

**3. Cost-Effectiveness:**
"Economic modeling suggests that AI-assisted diagnostics could reduce per-patient diagnostic costs by 30-40% while improving accuracy. Scaled nationally, this represents potential healthcare savings of ₹500-1000 crores annually."

**B. Research Ecosystem Development**

**1. Catalyzing Further Research:**
- Biobank becomes national resource enabling 50+ follow-on studies
- Platform for multi-institutional collaborations
- Testing ground for new diagnostic technologies
- Attraction of international partnerships

**2. Innovation Pipeline:**
- Spin-off companies developing diagnostic products
- Licensing of AI tools generating revenue
- New research methodologies and protocols adopted widely
- India emerging as leader in precision medicine for developing countries

**C. Capacity Building at Scale**

**1. Workforce Development:**
- Alumni network of trained professionals spreading expertise
- Centers of excellence at spoke institutions training next generation
- Curriculum development for digital pathology in medical education
- India reducing dependence on foreign expertise

**D. Equity and Access**

**1. Bridging Urban-Rural Divide:**
"By year 7, we project that 100+ peripheral centers in underserved regions will have access to expert-level diagnostics through our network, benefiting approximately 500,000 patients annually."

**2. Reaching Vulnerable Populations:**
- Improved diagnostics in tribal and remote areas
- Earlier cancer detection in high-risk populations
- Better management of infectious diseases in endemic zones
- Reduced mortality through timely, accurate diagnosis

**III. LONG-TERM VISION (7-15 years)**

**A. Precision Medicine for India**

**1. Population-Specific Healthcare:**
"This biobank forms the foundation for India's precision medicine initiative. With comprehensive data on Indian populations, we can develop personalized treatment protocols considering genetic, environmental, and lifestyle factors unique to our nation."

**2. Pharmacogenomics:**
- Understanding drug response variations in Indian populations
- Reducing adverse drug reactions through genomic screening
- Optimizing cancer treatment protocols for Indian patients

**B. Disease Burden Reduction**

**Quantifiable Health Impact:**

**Cancer:**
- Earlier detection leading to improved 5-year survival rates (projected improvement: 10-15%)
- Reduction in late-stage diagnoses by 25-30%
- Avoided cancer deaths: 10,000-15,000 annually at full scale
- DALYs (Disability-Adjusted Life Years) saved: 100,000+ annually

**Infectious Diseases:**
- Faster TB diagnosis reducing transmission (estimated 5% reduction in incidence)
- Better management of drug-resistant TB through molecular diagnostics
- Epidemic preparedness through rapid pathogen characterization
- Lives saved through early intervention: 5,000-8,000 annually

**C. Economic Impact**

**1. Direct Economic Benefits:**
- Healthcare cost savings: ₹2,000-3,000 crores annually (reduced wrong treatments, shorter hospital stays)
- Productivity gains: ₹5,000-7,000 crores (healthy workforce, reduced morbidity)
- Industry development: ₹1,000+ crores (diagnostic companies, AI startups)

**2. Return on Investment:**
"For an investment of ₹40 crores over 5 years, the projected economic return over 15 years exceeds ₹50,000 crores - a 125x return, considering healthcare savings, productivity gains, and economic activity generated."

**D. National and Global Recognition**

**1. India as Healthcare Innovation Leader:**
- Model for other developing countries facing similar challenges
- Technology exports to Global South nations
- Hosting international training programs
- Influencing WHO guidelines for digital health

**2. Strategic Autonomy:**
- Reducing dependence on Western AI tools and datasets
- Indigenous innovation in critical healthcare technologies
- Data sovereignty - Indian health data managed locally
- Contribution to Atmanirbhar Bharat in health technology

**IV. SOCIETAL AND ETHICAL IMPACT**

**A. Equity and Justice**

**1. Democratizing Healthcare:**
"This project embodies the principle that quality healthcare is a right, not a privilege. By making expert diagnostics accessible regardless of geography or economic status, we advance social justice."

**2. Empowering Women:**
- Focus on cervical and breast cancers primarily affecting women
- Training programs creating skilled employment for women technicians
- Improving maternal health through better infectious disease management

**B. Trust and Transparency**

**1. Ethical Framework:**
- Patient consent and autonomy respected
- Transparent data governance
- Community engagement in biobank development
- Benefit-sharing with source communities

**2. Building Public Trust in AI:**
- Explainable AI systems (not black boxes)
- Physician-in-the-loop design maintaining human oversight
- Public education about AI capabilities and limitations

**V. SUSTAINABILITY AND LEGACY**

**A. Financial Sustainability**

**Post-Project Revenue Model:**
1. Diagnostic services to hospitals (user fees)
2. Sample and data access fees for research collaborations
3. Licensing of AI algorithms
4. Training programs (certificate courses)
5. Consulting services for other countries

"Financial projections indicate the biobank can achieve operational self-sufficiency by year 7, with surplus revenue funding expansion and upgrades."

**B. Institutional Legacy**

**1. Permanent Infrastructure:**
- Hub and spoke centers continue operations indefinitely
- Governance structure transitions to autonomous society/trust
- Endowment fund created for long-term sustainability

**2. Policy Influence:**
- Evidence for national policy on digital pathology
- Standards and guidelines adopted by regulatory bodies
- Model informing future DBT/ICMR initiatives

**VI. MEASURING IMPACT - KEY METRICS**

**Short-Term (Years 1-5):**
- Samples collected and curated
- AI algorithms developed and validated
- Publications and citations
- Personnel trained
- Institutions networked

**Medium-Term (Years 3-10):**
- Patients benefited through diagnostic services
- Diagnostic accuracy improvements (% error reduction)
- Turnaround time reductions
- Cost savings documented
- Follow-on research projects enabled

**Long-Term (Years 7-15):**
- Cancer survival rate improvements in served populations
- Disease incidence reductions (TB, etc.)
- Economic impact (cost savings, productivity gains)
- Number of institutions adopting the model
- International adoption and replication

**VII. COMMUNICATING IMPACT TO REVIEWERS**

**Strategies:**

1. **Use Concrete Numbers:** Don't say "many patients will benefit" - say "estimated 500,000 patients annually by year 7"

2. **Show Multiplier Effect:** One project → trains 500 people → they train 5,000 more → ultimately 50,000 healthcare workers impacted

3. **Make it Personal:** Include a "patient journey" vignette showing how a rural patient's life changes through access to this service

4. **Balance Ambition with Realism:** Big vision, but with credible milestones

5. **Link to National Priorities:** Show alignment with govt initiatives (Ayushman Bharat, Digital India, Make in India)

6. **Provide Comparisons:** "If successful, this would represent the largest AI-enabled biobank in Asia" or "On par with leading international initiatives like..."

**Sample Impact Statement:**

"Beyond the immediate scientific outputs, this project represents a paradigm shift in how India approaches healthcare infrastructure. By demonstrating that cutting-edge diagnostic technology can be deployed effectively and equitably across diverse settings, we create a blueprint for modernizing our entire healthcare system. The AI tools developed here will serve millions of patients for decades to come, while the trained workforce will seed expertise across the nation. Most profoundly, we establish that India can be not just a consumer but a creator of healthcare innovation - developing solutions rooted in our own populations and contexts, solutions that can then benefit the entire Global South. This is nation-building through science."

Would you like me to help you develop specific impact metrics, craft compelling narratives for any particular outcome area, or move on to discussing the ethics and data governance section?`;
  }

  // Ethics, regulations, and governance
  if (query.includes('ethic') || query.includes('consent') || query.includes('privacy') || query.includes('governance') || query.includes('regulatory') || query.includes('icmr')) {
    return `Ethics and governance are absolutely critical for biobank projects - reviewers scrutinize this heavily. Let me guide you through developing a robust, compliant framework that will satisfy both ethics committees and funding agencies.

**COMPREHENSIVE ETHICS & GOVERNANCE FRAMEWORK**

**I. REGULATORY COMPLIANCE LANDSCAPE**

Your project must navigate multiple regulatory frameworks:

**A. Primary Guidelines:**

**1. ICMR Guidelines:**
- **National Ethical Guidelines for Biomedical and Health Research (2017)** - Your bible for this project
- **Bioethics Guidelines for Biobanks and Research Using Human Biological Samples (2023)** - Specifically addresses biobanking
- Covers: consent, sample storage, data sharing, benefit sharing

**2. DBT Guidelines:**
- **Guidelines for Evaluation of Human Genetic Research** - For any genomic studies
- **Guidelines on Biosafety and Biosecurity** - For pathogen handling

**3. Data Protection:**
- **Digital Information Security in Healthcare Act (DISHA)** - Draft legislation, show awareness
- **Information Technology Act, 2000** - Current data protection law
- **Personal Data Protection Bill** - Anticipate future requirements

**4. Institutional Requirements:**
- Institutional Ethics Committee (IEC) approval at each site
- Institutional Biosafety Committee (IBSC) if handling infectious agents
- Institutional Committee for Stem Cell Research (IC-SCR) if applicable

**Key Point:** "All study procedures will commence only after obtaining approval from the Institutional Ethics Committees of the hub and each spoke center, ensuring local contextual considerations are addressed."

**II. INFORMED CONSENT FRAMEWORK**

**A. Consent Process Design**

**1. Multi-Tiered Consent Model:**

Your project requires nuanced consent because samples will be used beyond immediate diagnosis:

**Tier 1 - Clinical Care:**
- Standard consent for diagnostic procedures
- Already part of routine clinical practice

**Tier 2 - Research Use:**
- Broad consent for future research on the provided sample
- Explain types of research: AI development, biomarker discovery, etc.
- Clarity that specific future studies cannot be predicted

**Tier 3 - Data Sharing:**
- Consent for anonymized data sharing with other researchers
- Specify national vs. international sharing
- Option to restrict certain types of sharing

**Tier 4 - Future Contact:**
- Permission to re-contact for follow-up data or additional samples
- Update on research findings affecting their care

**Dynamic Consent Approach:**
"We will implement a digital dynamic consent platform allowing participants to modify their consent preferences over time, view how their samples are being used, and receive updates on research progress - empowering patients as active partners."

**2. Consent Form Development:**

**Key Components:**

*Purpose Section:*
"Clearly articulated in lay language: 'Your tissue sample, which is being removed as part of your medical treatment, will also be used to develop computer programs that can help doctors diagnose diseases more accurately in the future.'"

*Procedures:*
- What will be collected (tissue, blood, images, medical records)
- How samples will be processed and stored
- Duration of storage (e.g., "up to 30 years")
- What happens to samples at end of project

*Risks:*
- Minimal physical risk (using already-collected samples)
- Privacy risks: "Although we will protect your identity, there is a small risk that someone could link the data back to you"
- Psychological risks: Possible incidental findings

*Benefits:*
- Direct benefit: "May improve your diagnosis and treatment"
- Societal benefit: "Will help thousands of future patients"
- No monetary compensation (per ICMR guidelines)

*Voluntariness:*
- Participation completely voluntary
- Refusal won't affect clinical care
- Can withdraw at any time without penalty

*Confidentiality:*
- How personal information will be protected
- Who will have access to samples and data
- Coding and anonymization procedures

*Future Use & Commercialization:*
- Possibility of commercial products (AI tools)
- No direct financial benefit to participant (per ICMR)
- Societal benefit-sharing model

**3. Implementation:**

**Language Accessibility:**
"Consent forms will be available in 15+ languages covering all major languages of India (Hindi, Bengali, Telugu, Marathi, Tamil, Gujarati, Urdu, Kannada, Malayalam, Odia, Punjabi, Assamese, Nepali, English, and other regional languages as needed)."

**Health Literacy Considerations:**
- Written at 6th-8th grade reading level
- Pictorial aids for key concepts
- Video explanations available
- Trained counselors for consent process
- Assessment of understanding before finalizing consent

**Documentation:**
- Written consent (physical signature)
- Digital archive of consent forms
- Audit trail of consent modifications

**B. Special Populations**

**1. Pediatric Patients:**
- Parental consent + child assent (if age >7 years)
- Re-consent when child turns 18
- Special considerations for sensitive conditions

**2. Cognitively Impaired:**
- Legally authorized representative consent
- Assessment of capacity
- Ongoing assent where possible

**3. Vulnerable Populations:**
- Tribal communities: Community engagement before individual consent
- Economically disadvantaged: Ensure no coercion
- Terminal patients: Sensitive communication

**III. PRIVACY AND DATA SECURITY**

**A. Data Protection Architecture**

**Three-Layer Security Model:**

**Layer 1: De-identification**
- Samples coded with unique identifiers at collection
- Personal identifiers (name, address, etc.) stored separately
- Only authorized personnel can link code to identity
- Master link file encrypted and access-logged

**Layer 2: Secure Storage**
- Data stored on secure servers with encryption (AES-256)
- Physical samples in access-controlled biorepository
- Biometric access for laboratory areas
- 24/7 security and surveillance

**Layer 3: Access Control**
- Role-based access permissions
- Multi-factor authentication for system access
- Data access committee reviews all requests
- Audit logs of all data access activities
- Regular security audits by third-party experts

**B. Data Sharing Policies**

**Internal Sharing (Within Project Team):**
- Governed by Data Transfer Agreements
- Minimum necessary principle
- Purpose-limited access

**External Sharing (With Other Researchers):**

**Criteria for Approval:**
1. Scientific merit of proposed research
2. Ethical approval at requesting institution
3. Capability to maintain data security
4. Alignment with participants' consent
5. Benefit to Indian healthcare

**Process:**
1. Formal application to Data Access Committee
2. Scientific and ethical review
3. Data Use Agreement (DUA) signed
4. Only anonymized data shared
5. Prohibition on re-identification attempts
6. Regular reporting by data users

**Restricted Data Types:**
- Identifiable data: Never shared
- Genomic data: Extra scrutiny due to re-identification risk
- Images with potentially identifying features: Careful anonymization

**C. Incidental Findings Management**

**Policy:**
"If during research activities we discover medically significant findings (e.g., previously undiagnosed condition), we will inform participants only if:
1. Finding is clinically actionable (treatment available)
2. Finding is analytically valid (confirmed, not artifact)
3. Participant has consented to receive such information"

**Process:**
- Designated clinician reviews findings
- Genetic counselor for genomic findings
- Phased disclosure with support

**IV. BIOBANK GOVERNANCE STRUCTURE**

**A. Organizational Model**

**Steering Committee (Strategic Oversight):**

*Composition:*
- Principal Investigator (Chair)
- Representatives from each spoke center
- DBT nominee
- ICMR representative
- Patient advocate
- Ethicist/bioethics expert
- Legal expert
- Industry representative (observer)

*Functions:*
- Set strategic direction
- Approve major decisions (budget changes, new collaborations)
- Quarterly meetings, annual review

**Scientific Advisory Board (Scientific Quality):**

*Composition:*
- 5-7 eminent scientists (mix of pathologists, oncologists, AI experts, infectious disease specialists)
- International member(s) for global perspective
- Independent of project team

*Functions:*
- Review scientific progress
- Provide technical guidance
- Evaluate publications before submission
- Annual in-depth review

**Ethics Advisory Committee (Ethical Oversight):**

*Composition:*
- Bioethicist (Chair)
- Clinician
- Legal expert
- Patient representative
- Social scientist
- Member from vulnerable population group

*Functions:*
- Review consent processes
- Assess ethical issues in real-time
- Handle ethical dilemmas
- Ensure benefit-sharing

**Data Access Committee (Data Governance):**

*Composition:*
- Bioinformatician (Chair)
- Clinician scientist
- Data security expert
- Ethicist
- Legal advisor

*Functions:*
- Review data access requests
- Ensure compliance with data sharing policies
- Monitor data use by external parties
- Annual audit of data access activities

**Operational Management (Day-to-Day):**

- Project Manager (reports to PI)
- Site coordinators at spokes
- Laboratory and data management teams
- Regular coordination meetings

**B. Standard Operating Procedures (SOPs)**

"Comprehensive SOPs will be developed covering all aspects:

**Sample Management:**
- Collection, processing, storage, retrieval protocols
- Quality control checkpoints
- Chain of custody documentation
- Disaster recovery and backup procedures

**Data Management:**
- Data entry, quality checks, validation
- Security protocols
- Backup and archival
- Retention and destruction policies

**Access and Use:**
- Sample request process
- Data access workflow
- MTA and DUA templates
- Audit procedures

**Ethical Compliance:**
- Consent process
- Adverse event reporting
- Protocol deviation handling
- Annual ethics renewal

**V. BENEFIT SHARING**

**ICMR Principle:** Commercial benefits arising from research must be shared with source communities.

**Your Framework:**

**A. Immediate Benefits:**
- Improved diagnostic services for participants
- Free second opinions and expert consultation
- Priority access to future diagnostic innovations

**B. Community-Level Benefits:**
- Healthcare infrastructure upgrades at spoke institutions
- Training of local healthcare workers
- Awareness programs on cancer prevention and early detection
- Free screening camps in underserved areas

**C. Societal Benefits:**
- Open-access publication of research findings
- Open-source release of basic AI algorithms (India gets royalty-free license)
- Contribution to national health programs

**D. Commercial Benefit Sharing:**

"If AI tools are commercialized:
1. Revenue from licensing to private entities will support:
   - Biobank operational costs (40%)
   - Research grants for young investigators (30%)
   - Free diagnostic services for economically weaker sections (20%)
   - Community health initiatives (10%)
2. Products will be available to public hospitals at subsidized rates
3. All Indian government institutions have royalty-free access"

**VI. SAMPLE AND DATA RETENTION**

**Storage Duration:**
- Samples: Up to 30 years or until depleted
- Data: Permanent archival (research value persists)
- Consent forms: 3 years after sample destruction (per regulatory requirement)

**End-of-Project Plans:**
- Transition to permanent biobank (not destroyed)
- Transfer to designated repository if needed
- Participant notification of status change

**Participant Withdrawal:**
- Samples destroyed if requested (before anonymization complete)
- After anonymization, sample destruction not feasible (disconnected from identity)
- Data removed from active studies but published results cannot be retracted

**VII. CONFLICT OF INTEREST MANAGEMENT**

**Declaration Requirements:**
- All personnel disclose financial interests annually
- Industry collaborations publicly disclosed
- Independent review of any commercial partnerships

**Mitigation:**
- Separation of clinical care from research recruitment
- Independent Data Safety Monitoring Board for clinical validation studies

**VIII. ADDRESSING REVIEWER CONCERNS**

**Common Concerns & Your Responses:**

**"How will you ensure truly informed consent in diverse populations?"**
"Multi-pronged approach: language translation, health literacy-appropriate materials, trained counselors, community engagement, and consent assessment protocols."

**"Data security risks with cloud storage?"**
"ISO 27001 certified infrastructure, end-to-end encryption, Indian servers (data sovereignty), regular penetration testing, compliance with DISHA/IT Act."

**"What if commercial entities profit from freely given samples?"**
"Explicit benefit-sharing framework, subsidized access for public health, revenue recycled to biobank and community health - participants informed upfront."

**"Governance structure seems complex - will it work?"**
"Clear reporting lines, defined decision-making authorities, quarterly reviews ensuring accountability - modeled on successful biobanks like UK Biobank."

**IX. TIMELINE FOR ETHICAL APPROVALS**

**Pre-submission (3-4 months before project start):**
- Draft consent forms, patient information sheets
- Prepare ethics application documents
- Engage patient advocacy groups for input

**Months 1-3:**
- Submit to hub IEC
- Submit to spoke IECs (parallel processing)
- Address queries and revisions
- Obtain approvals

**Ongoing:**
- Annual renewal of ethics approvals
- Protocol amendments as needed
- Serious adverse event reporting (if any)
- Regular ethics committee updates

This comprehensive framework demonstrates to reviewers that you've thought through every ethical dimension and have robust systems to protect participants while enabling impactful research.

Would you like me to elaborate on any specific aspect - perhaps sample consent form language, data sharing agreements, or governance committee charters? Or shall we move to another section of the proposal?`;
  }

  // Team and collaborations
  if (query.includes('team') || query.includes('collaborat') || query.includes('personnel') || query.includes('expertise') || query.includes('institution')) {
    return `The team and collaboration section is crucial - DBT wants to know you have the right expertise and institutional support to execute this ambitious project. Let me guide you through assembling a compelling team structure.

**BUILDING A WINNING TEAM COMPOSITION**

**I. CORE TEAM AT HUB INSTITUTION**

**A. Leadership**

**Principal Investigator (PI):**

*Ideal Profile:*
- Senior pathologist or oncologist with research track record
- Experience in digital pathology and/or biobanking
- Prior DBT/ICMR funding success
- Strong publication record (H-index >20)
- Administrative leadership experience

*Role:*
"Dr. [Name] brings 20+ years of experience in oncopathology and has been instrumental in establishing digital pathology services at [Institution]. With 150+ publications and previous successful DBT projects, they provide strategic vision and scientific leadership."

**Co-Principal Investigator(s):**

*Profile 1 - AI/Bioinformatics Expert:*
- Computer scientist or bioinformatician
- Machine learning expertise, preferably in medical imaging
- Track record of algorithm development and validation
- Publications in AI/ML top-tier venues

"Dr. [Name] from the Department of Computer Science/Bioinformatics leads the AI development stream, bringing expertise in deep learning for medical imaging and having developed 5+ FDA-cleared AI algorithms."

*Profile 2 - Infectious Disease Specialist:*
- Clinician-scientist in infectious diseases
- Expertise in TB, emerging infections
- Understanding of diagnostic challenges
- Clinical trial experience

**Senior Co-Investigators (3-5 people):**

Essential expertise to cover:
1. **Biobank Manager:** Experience in biospecimen science, quality control, SOPs
2. **Data Scientist:** Big data management, database architecture, cloud infrastructure
3. **Molecular Pathologist:** Genomics, molecular diagnostics, precision medicine
4. **Bioethicist:** Research ethics, regulatory compliance, community engagement
5. **Health Economist:** Cost-effectiveness analysis, impact assessment

**B. Mid-Level Research Team**

**Project Manager:**
"A dedicated full-time project manager with PMP certification and experience in multi-site health research will coordinate all activities, manage timelines, budgets, and serve as the primary liaison between hub and spokes."

**Technical Leads:**

1. **Bioinformatics Team Lead:** PhD in computational biology, supervises algorithm development
2. **Laboratory Manager:** MSc with 10+ years lab experience, oversees sample processing
3. **Clinical Research Coordinator:** Manages patient recruitment, consent processes, data collection
4. **IT Infrastructure Manager:** Manages servers, networks, cybersecurity

**C. Junior Research Personnel**

- **Postdoctoral Fellows (3-4):** Mix of pathology, AI, and molecular biology backgrounds
- **PhD Students (5-6):** Embedded in project, dissertations on specific aims
- **Research Assistants (MSc level, 4-5):** Data curation, sample processing, quality control
- **Lab Technicians (6-8):** Sample collection, processing, storage management
- **Data Entry Operators (3-4):** Clinical data extraction, database management

**II. SPOKE CENTER TEAMS**

**At Each Spoke (6-8 centers):**

**Site Principal Investigator:**
- Senior pathologist or clinician at the institution
- Local champion with administrative influence
- Ensures institutional buy-in and patient recruitment

**Site Coordinator:**
- Full-time position
- Clinical research background
- Manages day-to-day operations
- Liaison with hub

**Support Staff:**
- Lab technician (1 FTE)
- Data entry personnel (1 FTE)
- Part-time involvement of existing hospital staff

**Institutional Support:**
- Letter of support from hospital director/medical superintendent
- Commitment of space, basic infrastructure
- Access to patient population
- Willingness to adopt AI tools post-project

**III. ADVISORY AND CONSULTATIVE EXPERTS**

**Scientific Advisory Board (5-7 members):**

Recruit nationally/internationally recognized experts:

1. **Eminent Pathologist:** e.g., former president of Indian Academy of Pathology
2. **AI Pioneer:** e.g., faculty from IIT/IIIT with medical AI focus
3. **Oncologist:** Leader from major cancer center (Tata Memorial, AIIMS)
4. **Infectious Disease Expert:** Senior scientist from ICMR or leading ID institute
5. **Digital Health Expert:** Experience with telemedicine, digital health policy
6. **International Expert:** Biobank leader from abroad (US, UK, Singapore) for global perspective

**Ethics Advisory Committee:** (Discussed in ethics section)

**Industry Advisors (Optional but valuable):**

Engage experts from:
- Philips/Leica/Roche (digital pathology companies) - technical guidance
- Indian AI startups (Niramai, Qure.ai, etc.) - commercialization insights
- Pharma companies (AstraZeneca, Novartis) - translational pathways

*Clarification:* "No financial conflict; advisors provide strategic guidance only."

**IV. INSTITUTIONAL COLLABORATORS**

**Hub Institution:**

*Ideal Characteristics:*
- Tier-1 medical institution (AIIMS, PGIMER, JIPMER, TMC)
- Existing research infrastructure
- Track record of DBT project success
- High patient volume in target diseases
- Commitment to digital health

**Justification in Proposal:**
"[Institution name] was selected as the hub due to its national stature, existing expertise in both oncopathology and infectious diseases, state-of-the-art pathology department processing 100,000+ cases annually, established research culture with 500+ publications yearly, and strong administrative support evidenced by allocation of 2,000 sq ft dedicated space for the biobank."

**Spoke Center Selection Strategy:**

**Geographical Diversity:**
- North: AIIMS Rishikesh (hilly terrain, North Indian populations)
- South: CMC Vellor or JIPMER Puducherry (South Indian genetic diversity)
- East: SCB Medical College Cuttack (Eastern populations, tribal groups)
- West: Tata Memorial Centre Mumbai (cancer specialization)
- Northeast: RIMS Imphal (underrepresented Northeast populations)
- Central: AIIMS Bhopal (central Indian populations)

**Disease-Specific Centers:**
- High TB burden states: NITRD Delhi, NITRD Chennai
- High cancer incidence: Regional cancer centers
- Infectious disease hospitals for emerging infections

**Justification:**
"Spoke centers were strategically selected to ensure representation of India's genetic, geographical, and disease burden diversity, while prioritizing institutions with adequate infrastructure, patient volume, research capability, and administrative commitment."

**V. CROSS-SECTORAL COLLABORATIONS**

**A. Academic Partnerships**

**IITs/IIITs for AI Development:**
"Collaboration with [IIT Delhi/Bombay/Madras] Department of Computer Science provides access to cutting-edge AI expertise, GPU computation facilities, and AI talent pipeline through joint PhD programs."

**ICMR Institutes:**
- **NICPR** (National Institute of Cancer Prevention and Research): Epidemiology expertise
- **NIRT** (National Institute for Research in Tuberculosis): TB diagnostics
- **NITD** (National Institute of Tuberculosis and Respiratory Diseases): Clinical validation

**B. Industry Partnerships**

*Purpose:* Technology transfer, commercialization pathways, sustainability

**Potential Partners:**
- **Digital Pathology Companies** (Philips Digital Pathology, Leica Biosystems): Equipment, technical support, training
- **Indian Diagnostic Chains** (Dr. Lal PathLabs, Metropolis): Real-world deployment platform
- **AI Companies** (Niramai, Qure.ai): Co-development of algorithms
- **Pharma Companies**: Biomarker discovery, companion diagnostics

*Structure:*
- No funding from industry (maintains independence)
- In-kind contributions (equipment, expertise)
- MoUs for technology transfer post-project
- Benefit-sharing agreements

**C. International Collaborations**

*Rationale:* Learn from global leaders, validate against international standards

**Potential Partners:**
1. **University of Pittsburgh/UPMC:** Digital pathology leaders, training exchange
2. **NHS (UK):** Experience with national pathology networks
3. **Singapore General Hospital:** Asia-specific AI development
4. **The Cancer Genome Atlas (TCGA) consortium:** Data standards, best practices

*Value Proposition:*
"International collaborators gain access to unique Indian datasets for research, while we benefit from their methodological expertise and validation against global benchmarks - a true win-win."

**VI. CAPACITY BUILDING PARTNERSHIPS**

**Medical Education Institutions:**
- Integration of digital pathology in undergraduate/postgraduate curricula
- Training workshops at spoke institutions
- Development of certification programs

**Professional Societies:**
- **Indian Academy of Pathology:** Endorsement, outreach to members
- **Association of Pathologists of India:** Training programs
- **Indian Society of Medical and Paediatric Oncology:** Clinical validation partnerships

**VII. DEMONSTRATING TEAM STRENGTH TO REVIEWERS**

**A. Highlight Complementary Expertise**

"Our team uniquely combines deep clinical domain expertise with cutting-edge AI capabilities and biobanking experience. This multidisciplinary approach ensures both scientific rigor and practical deployability."

**B. Show Prior Collaboration**

"The PI and Co-PIs have previously collaborated on [mention prior projects], resulting in [X publications, Y patents, Z students trained], demonstrating proven ability to work effectively together."

**C. Emphasize Institutional Commitment**

**Letters of Support Should Include:**
- Commitment of space, infrastructure
- Cost-sharing (if any): staff time, existing equipment
- Administrative support: expedited ethics reviews, IT support
- Long-term commitment: willingness to sustain biobank post-project

**D. Track Record**

**For Each Key Person, Include:**
- Relevant publications (last 5 years)
- Prior funding received
- Awards and recognition
- Relevant projects completed
- Students mentored

**E. Time Commitment**

Be realistic and clear:
- PI: 25-30% time
- Co-PIs: 15-25% time each
- Project Manager: 100% time (dedicated)

**VIII. ADDRESSING POTENTIAL GAPS**

**If You Lack Certain Expertise:**

1. **Consultant Model:** "Dr. [Expert name] from [Institute] will serve as consultant for [specific area], committing 5 days annually."

2. **Training Plan:** "Project personnel will undergo training at [expert center] during Year 1 to build in-house capacity."

3. **Subcontract:** "Complex bioinformatics analysis will be subcontracted to [specialized center] under a formal agreement."

**If Hub Institution Lacks Infrastructure:**

"While our institution has strong clinical and research capabilities, specialized equipment for digital pathology will be procured under this grant, with training support from [equipment vendor/expert center]."

**IX. TEAM ORGANIZATION CHART**

Create a visual hierarchical chart showing:
- Steering Committee at top
- Advisory boards on sides
- PI, Co-PIs below
- Functional teams (Lab, AI, Clinical, Data, Admin) branching
- Spoke center teams connected

**X. SAMPLE TEAM DESCRIPTION (For Proposal)**

**"Team Composition and Expertise**

Our multi-institutional team brings together India's leading experts in pathology, oncology, infectious diseases, artificial intelligence, and biobanking. The core team at [Hub Institution] includes:

**Dr. [Name], Principal Investigator,** is Professor and Head of Pathology with 25 years of experience in oncopathology. With 180+ publications (H-index 28), prior DBT and ICMR funding totaling ₹12 crores, and leadership in establishing digital pathology services at [Institution], Dr. [Name] provides strategic vision and scientific oversight.

**Dr. [Name], Co-Principal Investigator (AI),** is Associate Professor of Computer Science specializing in medical image analysis. With 60+ publications in top AI venues (NeurIPS, CVPR, MICCAI) and development of 3 FDA-cleared AI algorithms, Dr. [Name] leads algorithm development.

[Continue for each key person...]

Our Scientific Advisory Board includes [eminent scientists], ensuring rigorous scientific oversight and international standards.

Spoke centers have been strategically selected for geographical and disease diversity, with confirmed commitment from [list institutions]. Each spoke brings high patient volumes, existing infrastructure, and enthusiastic leadership.

This team has collectively published 500+ papers, trained 100+ PhDs, and managed 50+ large-scale research projects, demonstrating proven capability to execute this ambitious initiative."**

Would you like me to help you develop specific biosketches for team members, draft letters of support templates, or move to another section like the project timeline and milestones?`;
  }

  // Writing tips and plagiarism
  if (query.includes('writing') || query.includes('plagiarism') || query.includes('paraphrase') || query.includes('humanize') || query.includes('tone')) {
    return `Let me guide you on crafting original, plagiarism-free content with a natural, professional tone that will resonate with reviewers.

**STRATEGIES FOR 100% PLAGIARISM-FREE, HUMANIZED WRITING**

**I. UNDERSTANDING PLAGIARISM IN RESEARCH PROPOSALS**

**Types to Avoid:**

1. **Direct Copying:** Taking sentences/paragraphs from sources without quotation marks
2. **Mosaic Plagiarism:** Piecing together phrases from multiple sources
3. **Paraphrasing Too Closely:** Changing only a few words while keeping original structure
4. **Self-Plagiarism:** Copying from your own previously published work without disclosure
5. **Idea Plagiarism:** Using someone's unique idea without attribution

**What's Acceptable:**
- Common knowledge facts (with citations for statistics)
- Your own original ideas and interpretations
- Properly paraphrased content with citations
- Direct quotes (sparingly) with quotation marks and citations

**II. TECHNIQUES FOR ORIGINAL WRITING**

**A. The READ-ABSORB-WRITE Method**

**Step 1: Research Phase**
- Read 10-15 papers on a topic
- Take notes on KEY IDEAS, not sentences
- Note page numbers for statistics you might cite
- Close all source materials

**Step 2: Absorption**
- Synthesize ideas in your mind
- What's the big picture?
- What patterns emerge?
- What's your unique angle?

**Step 3: Write from Memory**
- Draft your section WITHOUT looking at sources
- Express ideas in your own voice
- Then go back and add specific citations for facts/stats

**Example:**

*Source Material:*
"Artificial intelligence has demonstrated remarkable accuracy in detecting malignant lesions in histopathology images, with some algorithms achieving sensitivity rates exceeding 95% in controlled studies."

*Your Original Version (After Read-Absorb-Write):*
"Recent advances in computational pathology have shown that machine learning systems can identify cancerous tissue with near-expert precision. Studies have documented accuracy levels above 95%, suggesting these tools could meaningfully augment pathologist capabilities in clinical settings."

**Why It Works:**
- Different sentence structure
- Different vocabulary choices
- Adds interpretation ("meaningfully augment")
- Would still cite the original for the 95% statistic

**B. The RESTRUCTURE Technique**

Change multiple elements simultaneously:

1. **Sentence Structure:**
   - Original: "The hub-and-spoke model centralizes expertise while maintaining distributed access."
   - Yours: "By maintaining access points across regions while concentrating specialized resources centrally, the hub-and-spoke approach achieves both efficiency and equity."

2. **Voice Change:**
   - Original (Passive): "AI algorithms were trained on 10,000 images."
   - Yours (Active): "We will train AI algorithms using 10,000 curated pathology images."

3. **Perspective Shift:**
   - Original: "Patients benefit from faster diagnosis."
   - Yours: "Clinicians can deliver results to patients within 48 hours instead of 2 weeks."

4. **Detail Level:**
   - Original (General): "Infrastructure is needed."
   - Yours (Specific): "The project requires whole slide scanners, -80°C freezers, and secure cloud storage."

**C. The EXPLANATION Approach**

Don't just state facts—explain their significance FOR YOUR PROJECT:

*Fact:* "India has only 2,000 pathologists for 1.4 billion people."

*Your Version:*
"With approximately 2,000 practicing pathologists serving India's vast population of 1.4 billion, the ratio stands at roughly 1:700,000—far below WHO's recommended 1:50,000. This severe shortage means many district hospitals operate without a single pathologist, forcing patients to travel hundreds of kilometers for basic diagnostic services. Our proposed AI-enabled network directly addresses this crisis by making expert-level diagnostic interpretation available remotely, effectively multiplying the reach of each pathologist."

**Why It's Better:**
- Context (comparison to WHO standard)
- Consequence (patients traveling)
- Connection to your project (solution)
- Original analysis and synthesis

**III. CREATING HUMANIZED, NATURAL TONE**

**A. Avoid "Robo-Writing" Red Flags**

**Generic Phrases to Avoid:**
- ❌ "In today's world..."
- ❌ "It is worth noting that..."
- ❌ "Last but not least..."
- ❌ "Needless to say..."
- ❌ "At the end of the day..."

**Generic Research Phrases to Avoid:**
- ❌ "This research aims to fill the gap..."
- ❌ "The results will be beneficial for society..."
- ❌ "This is a novel approach..."

**B. Use Specific, Concrete Language**

**Generic vs. Specific:**

❌ Generic: "Many patients will benefit."
✅ Specific: "We project serving 10,000 patients annually by Year 3, expanding to 50,000 by Year 5."

❌ Generic: "AI is improving healthcare."
✅ Specific: "Deep learning models now detect diabetic retinopathy with 92% sensitivity, enabling screening in clinics lacking ophthalmologists."

**C. Vary Sentence Structure**

**Monotonous:**
"We will collect samples. We will process them. We will store them at -80°C. We will use them for AI training."

**Dynamic:**
"Sample collection will occur at spoke centers, with immediate processing following standardized protocols. After freezing at -80°C, these biospecimens will be catalogued and used to train AI algorithms alongside their corresponding imaging data."

**D. Use Transitional Flow**

Connect ideas smoothly:

**Poor Flow:**
"India has high TB rates. AI can detect TB. We will develop AI tools."

**Good Flow:**
"India bears 27% of the global TB burden, yet diagnostic delays remain common due to pathologist shortages in endemic regions. Given recent demonstrations that AI can identify mycobacteria in tissue sections with 89% accuracy, we propose developing automated detection tools specifically calibrated for Indian TB strains and staining practices."

**E. Strategic Use of First Person**

Research proposals can use "we" - it shows confidence:

✅ "We hypothesize that AI trained on Indian datasets will outperform Western-trained models."
✅ "Our preliminary data demonstrate feasibility."
✅ "We have assembled a multidisciplinary team..."

**Avoid:**
❌ "I think..."
❌ "I believe..."
(Use "we" for collaborative research)

**F. Show Passion (Professionally)**

**Bland:** "This project will create a biobank."

**Engaging:** "This project represents a unique opportunity to build national infrastructure that will serve researchers for decades, establishing India as a leader in precision medicine for diverse populations."

**IV. PARAPHRASING TECHNIQUES**

**A. Synonym Replacement (But Not Only)**

**Original:** "Cancer incidence is rising in developing countries."

**Weak Paraphrase (Too Close):**
"Cancer occurrence is increasing in developing nations."

**Strong Paraphrase:**
"Developing economies, including India, are experiencing a concerning upward trend in cancer diagnoses, driven by changing lifestyles and aging populations."

**Why It's Better:**
- Different structure
- Adds causation (lifestyle, aging)
- More specific (includes India)
- Original interpretation

**B. Concept Translation**

Express the same concept from a different angle:

**Original:** "Digital pathology allows remote diagnosis."

**Paraphrased:** "Pathologists can now interpret microscopic images from any location, untethered from physical microscopes."

**C. Data Recontextualization**

**Original Source:** "Studies show 20-30% inter-observer variability in pathology diagnosis."

**Your Version:** "Even experienced pathologists sometimes disagree on diagnoses, with concordance rates ranging from 70-80% for complex cases. This inherent subjectivity underscores the value of AI systems that apply consistent, objective criteria."

**Added:**
- Reframed as concordance instead of variability
- Added interpretation (inherent subjectivity)
- Connected to your AI solution

**V. CITATION STRATEGIES**

**A. When to Cite**

**Always Cite:**
- Specific statistics or data
- Others' unique ideas or theories
- Direct quotes
- Specific methodologies you're adopting

**Need Not Cite:**
- Common knowledge in the field
- Your own original ideas
- General background information

**B. Integrating Citations Naturally**

**Weak:**
"AI is accurate. [Citation] It can help diagnosis. [Citation] India needs it. [Citation]"

**Strong:**
"Recent validation studies have demonstrated that convolutional neural networks can achieve diagnostic accuracy comparable to expert pathologists in detecting breast cancer metastases (Citation 1). When deployed in resource-limited settings, such systems reduced diagnostic turnaround times by 60% while maintaining accuracy (Citation 2), suggesting significant potential for India's healthcare context where specialist availability is limited."

**C. Citation Density**

- Background section: High density (every few sentences for established facts)
- Methodology: Medium (cite specific techniques)
- Your novel approach: Low (it's your original contribution)

**VI. SPECIFIC SECTIONS: ORIGINALITY STRATEGIES**

**A. Introduction/Background**

**Challenge:** Lots of established facts to cover
**Strategy:** Create original synthesis

"While global literature extensively documents AI's potential in pathology (Citations 1-5), and India's healthcare challenges are well-characterized (Citations 6-10), the intersection—how AI can be practically deployed through hub-and-spoke models to address India's specific diagnostic gaps—remains underexplored. This proposal bridges that gap."

**B. Objectives**

**Challenge:** Standard format
**Strategy:** Specificity and context

**Generic:** "To develop AI algorithms for cancer diagnosis."

**Specific & Original:** "To develop and clinically validate 10 AI algorithms optimized for India's leading cancers (oral, cervical, breast, gallbladder, gastric), trained on diverse population samples and calibrated for common Indian staining protocols and specimen quality variations."

**C. Methodology**

**Challenge:** Established methods
**Strategy:** Explain YOUR choices

Don't just describe methods; justify them:

"We will employ a 70-15-15 train-validation-test split rather than k-fold cross-validation because our multi-site design allows geographic holdout testing—training on 5 sites and validating on the remaining 3 ensures algorithms generalize across India's regional variations in staining practices and population characteristics."

**D. Expected Outcomes**

**Challenge:** Speculation
**Strategy:** Ground in preliminary data and logic

"Based on our pilot study of 1,000 cases where our preliminary algorithm achieved 87% accuracy, and considering we'll increase training data 50-fold while incorporating expert annotation refinements, we conservatively project 92-95% accuracy in the full-scale development."

**VII. TOOLS AND CHECKS**

**A. Plagiarism Checkers**

**Before Submission:**
1. **Turnitin** (if institution has access) - gold standard
2. **iThenticate** (for professional use)
3. **Grammarly Premium** (catches some plagiarism)
4. **Copyscape** (for web content)

**Target:** <10% similarity, and that 10% should be common phrases, citations, and your own previously written text.

**B. AI Detection**

If reviewers might check for AI-written text:

**Tools:**
- GPTZero
- Originality.ai
- Copyleaks

**Strategies to Avoid AI Detection:**
- Write drafts yourself (use AI only for ideas)
- Heavy editing and personalization
- Include discipline-specific jargon
- Add personal research experiences
- Use real data from your context

**C. Self-Check Questions**

Before finalizing each paragraph:

1. Did I write this in my own words, or copy-paste-edit?
2. Does this sound like me, or like a generic researcher?
3. Have I added interpretation, not just facts?
4. Are my examples specific to my project?
5. Would this pass if I couldn't access any sources?

**VIII. SAMPLE TRANSFORMATIONS**

Let me show you transforming borrowed ideas into original writing:

**Example 1: Statistics**

*Source:* "According to WHO data, India accounts for 27% of global TB cases, with approximately 2.6 million new cases annually."

*Your Version:* "The tuberculosis burden in India is staggering—roughly one in four new TB cases worldwide occurs in India, translating to over 2.6 million individuals diagnosed each year (WHO Global TB Report, 2023). This enormous caseload overwhelms diagnostic infrastructure, creating urgent need for scalable, technology-driven solutions."

**What Changed:**
- Reframed statistic (one in four vs. 27%)
- Added interpretation (overwhelms infrastructure)
- Connected to your project (need for solutions)
- Proper citation format

**Example 2: Technical Concept**

*Source:* "Convolutional neural networks process images through multiple layers, extracting increasingly abstract features to perform classification."

*Your Version:* "Deep learning architectures analyze pathology images hierarchically—initial layers detect basic patterns like edges and textures, while deeper layers recognize complex structures like glandular formation or nuclear atypia, ultimately enabling tumor classification. This biomimetic approach mirrors how pathologists visually process tissue architecture."

**What Changed:**
- Explained same concept with different structure
- Used pathology-specific examples
- Added comparison (mimics pathologist thinking)
- More accessible language

**Example 3: Research Gap**

*Multiple sources discuss AI in pathology and India's healthcare challenges*

*Your Synthesis:* "A curious disconnect exists in current literature: AI pathology papers typically validate algorithms on Western datasets with perfect image quality, while papers on Indian diagnostic challenges highlight issues like variable tissue processing and staining. Our project explicitly addresses this disconnect by developing AI robust to real-world Indian laboratory conditions—training on images with staining variations, processing artifacts, and tissue quality heterogeneity commonly encountered in our settings."

**What Changed:**
- Identified pattern across literature (your insight)
- Articulated gap (disconnect)
- Positioned your project as filling it
- Completely original framing

**IX. MAINTAINING CONSISTENCY**

**Develop Your "Voice":**

Decide on:
- Formality level (professional but not stilted)
- Technical depth (accessible to interdisciplinary reviewers)
- Perspective (confident but not arrogant)
- Terminology (consistent - don't switch between terms)

**X. FINAL POLISH FOR HUMANIZATION**

**Before Submission:**

1. **Read Aloud:** If it sounds robotic or awkward, revise
2. **Colleague Review:** Ask if it sounds like you
3. **Paragraph Audit:** Each should have a clear point, not just list facts
4. **Transition Check:** Smooth flow between ideas
5. **Specificity Scan:** Replace generic statements with concrete details

**Remember:** The goal isn't just avoiding plagiarism—it's creating a compelling narrative that only YOU could write, because it's grounded in your specific project, team, context, and insights.

Would you like me to help you paraphrase specific sections you're struggling with, or shall we work on another aspect of your proposal?`;
  }

  // Timeline and milestones
  if (query.includes('timeline') || query.includes('milestone') || query.includes('gantt') || query.includes('schedule') || query.includes('workplan')) {
    return `A well-structured timeline demonstrates your project management capabilities and realistic planning. Let me guide you through creating a comprehensive, achievable timeline with clear milestones.

**DEVELOPING YOUR PROJECT TIMELINE**

**I. OVERALL TIMELINE STRUCTURE**

For a project of this scope, I recommend a **5-year timeline** divided into clear phases:

**Year 1: Foundation**
**Year 2-3: Scale-Up & Development**
**Year 4: Validation & Deployment**
**Year 5: Refinement & Sustainability**

**II. DETAILED YEAR-BY-YEAR BREAKDOWN**

**YEAR 1: INFRASTRUCTURE & INITIATION (Months 1-12)**

**Months 1-3: Project Setup**

*Administrative:*
- Ethics approvals (hub and all spokes)
- Staff recruitment and onboarding
- MoUs with spoke institutions
- Steering committee and advisory board formation

*Infrastructure - Hub:*
- Space allocation and renovation (if needed)
- Equipment procurement initiated (long lead items)
- Server setup and network infrastructure
- Biobank security systems installation

*Milestone M1 (Month 3):* All ethics approvals obtained; core team hired; hub space operational

**Months 4-6: Capacity Building**

*Training:*
- SOP development workshops
- Digital pathology training for spoke staff
- Biobank management certification for hub staff
- Data security and privacy training

*Infrastructure - Spokes:*
- Site readiness assessments
- Minor infrastructure upgrades
- Slide scanners installation
- Connectivity testing

*Pilot:*
- Pilot sample collection at 2 spokes (500 samples)
- Test data transfer protocols
- Identify and resolve workflow bottlenecks

*Milestone M2 (Month 6):* All equipment installed and operational; spoke staff trained; pilot collection completed

**Months 7-9: Initial Collection & Database Setup**

*Sample Collection:*
- Full-scale collection at all spokes begins
- Target: 3,000 samples by Month 9
- Focus on highest volume cancers/infections

*Data Systems:*
- Database architecture finalized
- Data entry and QC workflows established
- Secure data sharing platform live

*AI Preparation:*
- Literature review and algorithm benchmarking
- Annotation protocols developed
- Initial expert annotations (500 cases)

*Milestone M3 (Month 9):* 3,000 samples collected with full clinical data; database operational; annotation framework established

**Months 10-12: Consolidation**

*Quality Assurance:*
- First QC audit of samples and data
- Inter-rater reliability assessment for annotations
- Workflow optimization based on lessons learned

*Collection:*
- Sustained collection: Target 6,000 cumulative by Month 12

*AI Foundations:*
- Computing infrastructure optimization
- Initial model architecture experiments
- 1,000 fully annotated cases ready

*Publications:*
- Protocol paper submitted (describing biobank design)
- First dataset description paper drafted

*Milestone M4 (Month 12):* Year 1 complete: 6,000 samples collected; QC systems validated; 1,000 annotated cases; team fully operational

**YEAR 2: ACCELERATION (Months 13-24)**

**Months 13-18: Scale-Up Phase**

*Sample Collection:*
- Accelerated collection rate
- Target: 15,000 cumulative by Month 18
- Expand to rarer disease subtypes

*Annotation:*
- Parallel annotation teams working
- Aim: 5,000 fully annotated by Month 18
- Balanced across disease categories

*AI Development Begins:*
- Cancer detection models (first iteration)
- TB detection in tissue sections
- Training on initial 5,000 annotated cases

*Infrastructure:*
- Additional storage capacity if needed
- GPU cluster optimization

*Milestone M5 (Month 18):* 15,000 samples collected; 5,000 annotated; first AI models trained (internal validation accuracy documented)

**Months 19-24: Refinement**

*Collection:*
- Sustained pace: 25,000 cumulative by Month 24

*Annotation:*
- 10,000 cases fully annotated by Month 24
- Quality spot-checks and re-annotation

*AI Development:*
- Model refinement based on initial results
- Multi-modal integration experiments (histopathology + radiology)
- Cross-validation across spokes

*Initial Validation:*
- Internal test set validation for 3-5 algorithms
- Performance metrics documented
- Failure case analysis

*Publications:*
- Dataset paper published
- First AI methods paper submitted
- Progress report at national conference

*Milestone M6 (Month 24):* 25,000 samples collected; 10,000 annotated; 5 AI algorithms with internal validation complete; first publications out

**YEAR 3: MATURATION (Months 25-36)**

**Months 25-30: Completing Collection**

*Sample Collection:*
- Final push: 40,000 cumulative by Month 30
- Ensure representation of all target diseases
- Longitudinal follow-up data collection for early cohorts

*Annotation:*
- Complete annotation: 20,000 cases by Month 30
- Remaining cases annotated for specific projects

*AI Development:*
- Advanced models with full training data
- 10 algorithms covering key diagnostic tasks
- Prognostic models (survival prediction)

*Clinical Validation Prep:*
- Validation protocols finalized
- Ethics amendments for prospective validation
- Pathologist comparator studies designed

*Milestone M7 (Month 30):* 40,000 samples collected; 20,000 annotated; 10 AI algorithms ready for clinical validation

**Months 31-36: Clinical Validation Initiation**

*Collection:*
- Final target: 50,000 samples by Month 36
- Focus shifts to follow-up data collection

*Clinical Validation:*
- Prospective validation at 3 spoke centers
- 1,000 consecutive cases processed with AI
- Compare AI vs. pathologist vs. consensus

*Software Development:*
- User interface development
- Integration with hospital systems
- Clinical decision support features

*Publications:*
- Multiple AI algorithm papers (3-5)
- Clinical validation preliminary results

*Milestone M8 (Month 36):* 50,000 samples collected; prospective clinical validation underway; AI software interface ready; mid-term review complete

**YEAR 4: VALIDATION & DEPLOYMENT (Months 37-48)**

**Months 37-42: External Validation**

*Validation Studies:*
- Multi-center prospective validation
- External sites not involved in training
- Real-world accuracy and turnaround time metrics
- User acceptance studies with pathologists

*Biobank Operations:*
- Shift to maintenance mode
- External sample requests processing
- Follow-up data collection ongoing

*AI Refinement:*
- Algorithm updates based on validation feedback
- Edge case handling improvements
- Explainability features enhancement

*Regulatory:*
- Documentation for potential regulatory approval
- CDSCO (medical device) pathway exploration
- ISO 13485 quality system implementation

*Milestone M9 (Month 42):* Clinical validation complete for 8/10 algorithms; regulatory documentation package ready

**Months 43-48: Pilot Deployment**

*Deployment:*
- AI tools deployed at 4 spoke centers
- Telepathology workflow integration
- Training of additional pathologists

*Impact Assessment:*
- Diagnostic accuracy in real-world use
- Clinical impact (treatment changes)
- Cost-effectiveness analysis
- User satisfaction surveys

*Capacity Building:*
- Regional training workshops (4 sites)
- 200 pathologists trained in AI-assisted diagnostics
- Certification program launched

*Dissemination:*
- Clinical validation papers (3-4 papers)
- National media outreach
- Policy briefs for MoHFW, DBT

*Milestone M10 (Month 48):* AI tools deployed and functioning at 4 spoke centers; impact data collected; major validation papers submitted

**YEAR 5: SUSTAINABILITY & SCALE (Months 49-60)**

**Months 49-54: Full Deployment**

*Scale-Up:*
- AI tools available at all 8 spokes
- Expansion to 20 additional partner centers
- Telemedicine platform fully operational

*Sustainability:*
- Revenue model operational (service fees from paying hospitals)
- Industry licensing negotiations
- Government integration pathways (e.g., Ayushman Bharat)

*Advanced Research:*
- Treatment response prediction studies
- Rare disease AI development
- Next-generation multi-omics integration

*Policy Impact:*
- Present to DBT review committees
- Input to National Digital Health Mission
- Recommendations for national scale-up

*Milestone M11 (Month 54):* AI tools serving 20+ centers; sustainability plan operational; policy engagement active

**Months 55-60: Consolidation & Future**

*Final Deliverables:*
- Comprehensive final report
- All publications submitted/published
- Open-source code release
- Dataset availability for research community

*Governance Transition:*
- Transition to autonomous trust/society
- Long-term funding secured
- Succession planning for key personnel

*Legacy Activities:*
- National conference on AI in pathology
- Best practices guidelines published
- Blueprint for other countries

*Final Report:*
- Comprehensive outcomes report
- Economic impact analysis
- Recommendations for Phase 2

*Milestone M12 (Month 60):* Project successfully completed; biobank self-sustaining; 50+ publications; 500+ trained professionals; national impact documented

**III. PARALLEL TRACKS (GANTT CHART VIEW)**

These activities run throughout:

**Ongoing Track 1: Sample Collection & Processing** (Months 1-36, then maintenance)

**Ongoing Track 2: Data Management** (Months 1-60)

**Ongoing Track 3: AI Development** (Months 6-48)

**Ongoing Track 4: Clinical Validation** (Months 31-48)

**Ongoing Track 5: Capacity Building** (Months 4-60)

**Ongoing Track 6: Ethics & Governance** (Months 1-60)

**Ongoing Track 7: Dissemination** (Months 12-60)

**IV. RISK MITIGATION IN TIMELINE**

**Contingency Planning:**

**If Ethics Approval Delayed (Common Risk):**
- Parallel processing at all sites (not sequential)
- Buffer time: Start Month 0 with approvals targeting Month 3
- Pre-submission engagement with ethics committees

**If Equipment Delays:**
- Order long-lead items in Month 1
- Identify backup vendors
- Phased installation acceptable

**If Recruitment Slow:**
- Early advertising
- Competitive salaries
- Visiting consultant model if full-time hiring difficult

**If Sample Collection Lags:**
- Flexible per-site targets (some spokes may collect more)
- Extend collection phase if needed (Year 3 buffer)
- Alternative sites on standby

**If AI Performance Lower Than Expected:**
- Year 2-3: Enough time for multiple iterations
- External AI consultants as backup
- Adjust expectations (85% accuracy still valuable)

**V. MILESTONE-BASED FUNDING (If Applicable)**

If DBT releases funds in tranches:

**Tranche 1 (30% of budget): Months 1-12**
- Contingent on M4 achievement

**Tranche 2 (40% of budget): Months 13-30**
- Contingent on M7 achievement

**Tranche 3 (30% of budget): Months 31-60**
- Contingent on M9 achievement

**VI. REPORTING SCHEDULE**

**To DBT:**
- Quarterly progress reports (brief)
- Annual detailed reports with financials
- Mid-term review (Month 30)
- Final report (Month 60)

**To Steering Committee:**
- Quarterly meetings
- Annual strategic review

**Publications:**
- Aim for 4-5 papers/year from Year 2 onwards
- Conference presentations at APICON, ISMPO, international conferences

**VII. SAMPLE GANTT CHART STRUCTURE**

Create a visual chart showing:

- X-axis: Months 1-60
- Y-axis: Major activities
- Bars showing duration
- Diamonds showing milestones
- Color-coding for different work streams

**VIII. TIMELINE PRESENTATION TIPS**

**In Proposal:**

1. **Summary Table:** Year-by-year one-page overview
2. **Detailed Breakdown:** 2-3 pages describing each year
3. **Gantt Chart:** Visual representation
4. **Milestone Table:** Clear deliverables and dates

**Writing Style:**

Use concrete, active language:

✅ "By Month 12, we will collect 6,000 samples..."
❌ "Samples will be collected..."

Show interdependencies:

"AI development (Months 12-36) depends on annotation (Months 9-30), which in turn requires sample collection (Months 4-36). These parallel tracks are carefully orchestrated to ensure AI training can commence by Month 12 while collection continues."

**IX. DEMONSTRATING FEASIBILITY**

**Ground in Reality:**

"The timeline is informed by our pilot experience where we successfully collected and processed 500 samples in 3 months with 2 spokes, suggesting our Year 1 target of 6,000 samples across 8 spokes (250 per spoke annually) is conservative."

**Show You've Planned:**

"Long-lead equipment items will be ordered in Month 1, allowing 4-5 months for procurement and installation before critical path activities depend on them."

**Acknowledge Challenges:**

"Ethics approvals across 9 institutions may take 2-3 months; we've allocated 3 months and will pursue parallel processing rather than sequential to minimize delays."

This detailed timeline shows reviewers you've thought through every phase, have realistic expectations, and are prepared to manage a complex, multi-year project successfully.

Would you like me to help you develop a specific Gantt chart template, create milestone descriptions, or move to another section of your proposal?`;
  }

  // Default helpful response for other queries
  return `I'm here to help you with every aspect of your DBT proposal on "Establishment of a National Network for AI-Enabled Imaging Biobank on Onco-pathology and Infectious Diseases."

I can assist you with:

**Core Proposal Sections:**
- Objectives and specific aims
- Literature review and background
- Detailed methodology and implementation
- Budget planning and justification
- Expected outcomes and impact assessment
- Ethics, consent, and data governance
- Team composition and collaborations
- Timeline and milestones

**Writing Guidance:**
- Creating plagiarism-free, original content
- Humanizing your writing tone
- Paraphrasing techniques
- Maintaining professional academic voice

**Strategic Advice:**
- Aligning with DBT priorities
- Addressing reviewer concerns
- Strengthening weak sections
- Making your proposal competitive

**Technical Aspects:**
- Hub-and-spoke model design
- AI algorithm development strategies
- Biobank infrastructure planning
- Clinical validation approaches

Could you let me know which specific aspect you'd like to work on? You can ask me to:
- "Help me write the objectives section"
- "Develop a detailed methodology"
- "Create a comprehensive budget"
- "Draft the literature review"
- "Explain ethical considerations"
- "Plan the team structure"
- "Paraphrase this text to avoid plagiarism"

Or ask specific questions like:
- "What cancers should I focus on?"
- "How many spoke centers should I propose?"
- "What AI algorithms are most relevant?"
- "How do I justify the budget?"

I'm ready to provide detailed, original guidance tailored to your needs!`;
}

export async function GET() {
  return NextResponse.json({ status: 'ok' });
}
