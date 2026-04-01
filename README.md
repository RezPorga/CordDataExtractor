
**CordDataExtractor: Multi-modal Receipt Parsing**

CordDataExtractor is a full-stack AI application that transforms unstructured receipt images into structured, machine-readable JSON. By fine-tuning the LayoutLMv3 transformer model, the system understands not just the text on a receipt, but its spatial layout and visual features.


**Technical Stack**

 * Model: LayoutLMv3-Base (Fine-tuned on CORD dataset)
 * Backend: FastAPI (Python)
 * Frontend: Next.js (TypeScript/Tailwind CSS)
 * OCR Engine: Tesseract OCR
 * ML Libraries: Hugging Face Transformers, PyTorch, PIL


**Model & Fine-Tuning**

The core of this project is a fine-tuned LayoutLMv3 model hosted on Hugging Face (asimashan/CordDataExtractor-Model).

Key Highlights:

 * Spatial Awareness: Unlike text-only models, LayoutLMv3 uses 2D-positional embeddings to understand that a price is physically aligned with a product name.  
 * Fine-Tuning Strategy: Fine-tuned with a linear learning rate warmup ($5 \times 10^{-5}$) and AdamW optimizer to adapt the pre-trained weights to the high-variance domain of thermal receipts.  
 * Post-Processing Layer: A custom-engineered refinement layer resolves Byte-Pair Encoding (BPE) artifacts (e.g., merging B UL G into BULG) and segments multiple line items from a continuous token stream.


**Features**
 * Multi-modal Extraction: Processes text, layout, and image patches simultaneously.
 * Hierarchical Parsing: Extracts Vendor Name, itemized lists, and financial totals (Tax, Subtotal, Cash, Change).
 * Real-time Inference: Fast API endpoints optimized for low-latency document processing.
 * Responsive UI: A modern Next.js dashboard for image uploads and interactive JSON visualization.

**Project Structure**

	CordDataExtractor/
	├── backend/                # FastAPI Application
	│   ├── app/
	│   │   ├── routes/         # API Endpoints
	│   │   ├── services/       # LayoutLMv3 & OCR Logic
	│   │   └── main.py
	│   └── requirements.txt
	├── frontend/               # Next.js Application
	│   ├── components/         # Upload & Result Components
	│   ├── pages/              # Main Dashboard
	│   └── tailwind.config.js
	└── README.md

**Installation & Setup**

 * Backend (FastAPI)
   
   	* Navigate to backend folder:
   	  ```bash
   	  cd backend
   	* Create a virtual environment:
   	  ```bash
   	  python -m venv venc
   	  source venv/bin/activate #On Windows: venv\Scripts\activate
   	* Install dependencies:
   	  ```bash
   	  pip install -r requirements.txt
   	* Run the server:
   	  ```bash
   	  uvicorn app.main:app --reload
 * Frontend (Next.js)
   
	* Navigate to frontend folder:
	  ```bash
      cd frontend
    * Install packages:
      ```bash
      npm install
    * Run the development server:
      ```bash
      npm run dev
