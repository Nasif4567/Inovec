"use client";

import { useState } from "react";
import { FileText } from "lucide-react";

/* ===================== TYPES ===================== */

interface Block {
  id: string;
  type: "text" | "list" | "image";
  text?: string;
  items?: string[];
  url?: string;
}

interface TabContent {
  id: string;
  title: string;
  blocks: Block[];
}

interface PdfFile {
  id: string;
  name: string;
  data: string; // base64 or URL
}

interface ProductTabsViewerProps {
  tabs: TabContent[];
  pdfs?: PdfFile[];
}

/* ===================== COMPONENT ===================== */

export default function ProductTabsViewer({
  tabs,
  pdfs = []
}: ProductTabsViewerProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (!tabs || tabs.length === 0) {
    return (
      <div className="bg-white rounded-3xl border shadow-sm p-8 text-slate-400 italic">
        No specifications available.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border shadow-sm text-xl">
      {/* TAB HEADERS */}
      <div className="flex border-b overflow-x-auto">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(i)}
            className={`px-6 py-4 font-bold text-xl whitespace-nowrap transition ${
              activeTab === i
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="p-8 space-y-6">
        {tabs[activeTab].blocks.length === 0 && (
          <p className="text-slate-400 italic">
            No content available for this section.
          </p>
        )}

        {tabs[activeTab].blocks.map(block => {
          if (block.type === "text") {
            return (
              <p key={block.id} className="leading-relaxed text-slate-700">
                {block.text}
              </p>
            );
          }

          if (block.type === "list") {
            return (
              <ul
                key={block.id}
                className="list-disc pl-6 space-y-1 text-slate-700"
              >
                {block.items?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            );
          }

          if (block.type === "image") {
            return (
              <img
                key={block.id}
                src={block.url}
                alt=""
                className="rounded-2xl max-w-full border"
              />
            );
          }

          return null;
        })}

        {/* PDF SECTION */}
        {pdfs.length > 0 && (
          <div className="border-t pt-6">
            <h3 className="flex items-center gap-2 font-bold mb-4">
              <FileText size={18} /> Product Documents
            </h3>

            <div className="space-y-2">
              {pdfs.map(pdf => (
                <a
                  key={pdf.id}
                  href={pdf.data}
                  download={pdf.name}
                  className="flex justify-between items-center border rounded-xl p-3 hover:bg-slate-50 transition"
                >
                  <span className="text-sm font-medium">{pdf.name}</span>
                  <span className="text-blue-600 text-xs font-semibold">
                    Download
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
