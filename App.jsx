import { useState } from "react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip
} from "recharts";

// ─── Company ───────────────────────────────────────────────────────────────
const COMPANY = {
  name: "บริษัท ออร์ก้า ซับคอนแทรค แอนด์ คอนซัลแทนท์ จำกัด",
  business: "การบำรุงรักษารถยนต์และการซ่อมตัวถัง ประตู หน้าต่าง และอื่น ๆ ที่คล้ายกัน",
  category: "การบำรุงรักษาและการซ่อมตัวถัง ประตู หน้าต่าง และอื่น ๆ ที่คล้ายกัน",
};

// ─── Evaluation structure ──────────────────────────────────────────────────
const SECTIONS = [
  {
    id: "hard",
    label: "ส่วนที่ 1: ทักษะความเชี่ยวชาญเฉพาะด้าน",
    labelShort: "Hard Skills",
    icon: "🔧",
    color: "#1e3a5f",
    weight: 40,
    groups: [
      {
        id: "body",
        label: "ช่างเคาะ / ช่างตัวถัง",
        criteria: [
          { id: "h1", label: "การคืนรูปตัวถัง", desc: "ซ่อมแซมชิ้นงานให้กลับคืนรูปเดิมตามมาตรฐานโรงงานได้แม่นยำ" },
          { id: "h2", label: "การใช้เครื่องมือ", desc: "ความชำนาญในการใช้เครื่องมือดึงตัวถัง เครื่องเชื่อม และอุปกรณ์ต่างๆ" },
          { id: "h3", label: "ความเรียบร้อยของพื้นผิว", desc: "การโป๊วสี เก็บรายละเอียดพื้นผิวได้เรียบเนียนก่อนส่งมอบงาน" },
        ],
      },
      {
        id: "paint",
        label: "ช่างพ่นสี",
        criteria: [
          { id: "h4", label: "การเทียบสีและผสมสี", desc: "ความแม่นยำในการผสมสีให้ตรงกับตัวรถเดิม ไม่ผิดเฉด" },
          { id: "h5", label: "เทคนิคการพ่นสี", desc: "ลงสีได้สม่ำเสมอ ไม่มีรอยด่าง สีไหล หรือเม็ดฝุ่น" },
          { id: "h6", label: "การอบและขัดเงา", desc: "อบสีตามอุณหภูมิที่กำหนด ขัดเคลือบเงาได้สมบูรณ์" },
        ],
      },
    ],
  },
  {
    id: "productivity",
    label: "ส่วนที่ 2: ประสิทธิภาพในการทำงาน",
    labelShort: "Productivity",
    icon: "⚡",
    color: "#0369a1",
    weight: 25,
    groups: [
      {
        id: "prod",
        label: "",
        criteria: [
          { id: "p1", label: "ระยะเวลาในการทำงาน", desc: "ทำงานเสร็จสิ้นตามกำหนดเวลา (Turnaround Time / Estimate Time)" },
          { id: "p2", label: "อัตราการซ่อมซ้ำ (Rework Rate)", desc: "ทำงานจบในรอบเดียว ไม่ต้องแก้ไขซ้ำหรือมีงานเคลมซ้ำซ้อน" },
          { id: "p3", label: "การจัดการวัสดุ", desc: "ใช้วัสดุสิ้นเปลือง (สี, กระดาษทราย, ทินเนอร์) คุ้มค่า ไม่สูญเปล่า" },
        ],
      },
    ],
  },
  {
    id: "safety",
    label: "ส่วนที่ 3: กฎระเบียบ ความปลอดภัย และสิ่งแวดล้อม",
    labelShort: "Safety & 5S",
    icon: "🦺",
    color: "#b45309",
    weight: 20,
    groups: [
      {
        id: "safe",
        label: "",
        criteria: [
          { id: "s1", label: "อุปกรณ์ป้องกัน (PPE)", desc: "สวมหน้ากากกันสารเคมี แว่นตา และอุปกรณ์เซฟตี้ขณะปฏิบัติงาน" },
          { id: "s2", label: "การจัดการพื้นที่ 5S", desc: "จัดเก็บเครื่องมือ ทำความสะอาดห้องพ่นสี ดูแลพื้นที่หน้างานหลังเลิกงาน" },
          { id: "s3", label: "การปฏิบัติตามกฎ", desc: "เคร่งครัดในมาตรฐานความปลอดภัย ป้องกันอุบัติเหตุและอัคคีภัย" },
        ],
      },
    ],
  },
  {
    id: "soft",
    label: "ส่วนที่ 4: การทำงานร่วมกันและพฤติกรรม",
    labelShort: "Soft Skills",
    icon: "🤝",
    color: "#065f46",
    weight: 15,
    groups: [
      {
        id: "soft",
        label: "",
        criteria: [
          { id: "w1", label: "การทำงานเป็นทีม", desc: "ประสานงานกับช่างส่วนอื่นๆ (ช่างเครื่อง, แผนกประเมินราคา) ได้ดี" },
          { id: "w2", label: "ความรับผิดชอบ", desc: "ซื่อสัตย์ต่อหน้าที่ มีความกระตือรือร้นในการแก้ไขปัญหาเฉพาะหน้า" },
          { id: "w3", label: "การรับฟังข้อเสนอแนะ", desc: "นำคำแนะนำของหัวหน้างานหรือลูกค้ามาปรับปรุงงานอย่างเต็มใจ" },
        ],
      },
    ],
  },
];

const allCriteria = SECTIONS.flatMap((s) => s.groups.flatMap((g) => g.criteria));

const SCORE_META = {
  5: { label: "ดีเยี่ยม", color: "#16a34a", bg: "#dcfce7" },
  4: { label: "ดี", color: "#2563eb", bg: "#dbeafe" },
  3: { label: "ปานกลาง", color: "#d97706", bg: "#fef3c7" },
  2: { label: "ควรปรับปรุง", color: "#ea580c", bg: "#ffedd5" },
  1: { label: "ไม่ผ่านเกณฑ์", color: "#dc2626", bg: "#fee2e2" },
};

function getGrade(score) {
  if (score >= 90) return { label: "ดีเยี่ยม", sub: "ทักษะสูง ทำงานเสร็จก่อนกำหนด ไม่มีงานซ่อมซ้ำ", color: "#16a34a", letter: "A" };
  if (score >= 80) return { label: "ดี", sub: "ทำงานได้มาตรฐาน งานเสร็จตามกำหนด มีงานแก้เล็กน้อย", color: "#2563eb", letter: "B" };
  if (score >= 70) return { label: "ปานกลาง", sub: "ต้องได้รับการอบรมเพิ่มเติมในบางทักษะ", color: "#d97706", letter: "C" };
  return { label: "ต้องปรับปรุง", sub: "ประสิทธิภาพต่ำกว่ามาตรฐาน เสี่ยงต่อความปลอดภัย", color: "#dc2626", letter: "D" };
}

// ─── Spider Chart ──────────────────────────────────────────────────────────
function SpiderChart({ scores }) {
  const data = SECTIONS.map((s) => {
    const cIds = s.groups.flatMap((g) => g.criteria.map((c) => c.id));
    const vals = cIds.map((id) => scores[id] || 0);
    const avg = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    return { subject: s.labelShort, value: parseFloat(avg.toFixed(2)), fullMark: 5 };
  });

  const hasData = data.some((d) => d.value > 0);

  return (
    <div style={{ background: "#fff", borderRadius: 12, border: "1.5px solid #e2e8f0", padding: "16px 8px 8px", marginBottom: 20 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a5f", marginBottom: 4, paddingLeft: 12 }}>
        📊 Spider Chart — ภาพรวมสมรรถนะ
      </div>
      <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 8, paddingLeft: 12 }}>
        {hasData ? "แสดงคะแนนเฉลี่ยแต่ละหมวด (1–5)" : "กรอกคะแนนเพื่อแสดงกราฟ"}
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fontSize: 11, fill: "#475569", fontFamily: "Sarabun, Noto Sans Thai, sans-serif" }}
          />
          <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fontSize: 9, fill: "#94a3b8" }} tickCount={6} />
          <Tooltip
            formatter={(v) => [`${v} / 5`, "คะแนนเฉลี่ย"]}
            contentStyle={{ fontSize: 12, fontFamily: "Sarabun, Noto Sans Thai, sans-serif", borderRadius: 8 }}
          />
          <Radar
            name="คะแนน"
            dataKey="value"
            stroke="#1e3a5f"
            fill="#1e3a5f"
            fillOpacity={hasData ? 0.25 : 0}
            strokeWidth={2}
            dot={{ r: 4, fill: "#1e3a5f" }}
          />
        </RadarChart>
      </ResponsiveContainer>
      {/* Legend */}
      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", paddingBottom: 4 }}>
        {SECTIONS.map((s) => {
          const cIds = s.groups.flatMap((g) => g.criteria.map((c) => c.id));
          const avg = cIds.map((id) => scores[id] || 0).reduce((a, b) => a + b, 0) / cIds.length;
          return (
            <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: s.color }} />
              <span style={{ color: "#475569" }}>{s.labelShort}</span>
              {scores && avg > 0 && (
                <span style={{ fontWeight: 700, color: s.color }}>{avg.toFixed(1)}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Score Button ──────────────────────────────────────────────────────────
function ScoreBtn({ value, selected, onClick }) {
  const meta = SCORE_META[value];
  return (
    <button
      onClick={() => onClick(value)}
      title={meta.label}
      style={{
        width: 38, height: 38, borderRadius: 7,
        border: selected ? `2px solid ${meta.color}` : "1.5px solid #d1d5db",
        background: selected ? meta.bg : "#f9fafb",
        color: selected ? meta.color : "#6b7280",
        fontWeight: 700, fontSize: 15, cursor: "pointer", transition: "all 0.12s",
      }}
    >
      {value}
    </button>
  );
}

// ─── Evaluation Form ────────────────────────────────────────────────────────
function EvaluationForm({ onSubmit }) {
  const today = new Date().toISOString().slice(0, 10);
  const [info, setInfo] = useState({
    employeeName: "", employeeId: "", position: "", department: "",
    evaluator: "", evaluatorPosition: "", period: "", evalDate: today,
  });
  const [scores, setScores] = useState({});
  const [comments, setComments] = useState({});
  const [generalComment, setGeneralComment] = useState("");
  const [activeSection, setActiveSection] = useState("hard");

  const setInfoField = (k, v) => setInfo((f) => ({ ...f, [k]: v }));
  const setScore = (id, v) => setScores((s) => ({ ...s, [id]: v }));
  const setComment = (id, v) => setComments((c) => ({ ...c, [id]: v }));

  const scoredCount = allCriteria.filter((c) => scores[c.id]).length;
  const allScored = scoredCount === allCriteria.length;

  // Weighted total
  const totalScore = SECTIONS.reduce((acc, sec) => {
    const cIds = sec.groups.flatMap((g) => g.criteria.map((c) => c.id));
    const avg = cIds.map((id) => scores[id] || 0).reduce((a, b) => a + b, 0) / cIds.length;
    return acc + (avg / 5) * sec.weight;
  }, 0);

  const canSubmit = info.employeeName && info.position && info.evaluator && allScored;
  const grade = getGrade(totalScore);

  return (
    <div style={{ maxWidth: 780, margin: "0 auto", padding: "20px 14px 40px", fontFamily: "Sarabun, Noto Sans Thai, sans-serif" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#1e3a5f 0%,#0f2240 100%)", borderRadius: 14, padding: "22px 24px", marginBottom: 22, color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <div style={{ background: "#f59e0b", borderRadius: 10, width: 46, height: 46, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>🔧</div>
          <div>
            <div style={{ fontSize: 10, letterSpacing: 1.5, opacity: 0.6, textTransform: "uppercase", marginBottom: 2 }}>ระบบประเมินพนักงาน • โปรแกรม LAKE</div>
            <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.3 }}>{COMPANY.name}</div>
          </div>
        </div>
        <div style={{ fontSize: 11, opacity: 0.55 }}>หมวดธุรกิจ: {COMPANY.category}</div>
      </div>

      {/* Employee Info */}
      <div style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 12, padding: "18px 22px", marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a5f", marginBottom: 14, paddingBottom: 8, borderBottom: "2px solid #f1f5f9" }}>
          📋 ข้อมูลพนักงานและผู้ประเมิน
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { label: "ชื่อ-นามสกุลพนักงาน *", key: "employeeName", placeholder: "กรอกชื่อพนักงาน" },
            { label: "รหัสพนักงาน", key: "employeeId", placeholder: "เช่น EMP-001" },
            { label: "ตำแหน่ง *", key: "position", placeholder: "เช่น ช่างเคาะตัวถัง, ช่างพ่นสี" },
            { label: "แผนก/หน่วยงาน", key: "department", placeholder: "เช่น ฝ่ายซ่อมบำรุง" },
            { label: "ชื่อผู้ประเมิน *", key: "evaluator", placeholder: "กรอกชื่อผู้ประเมิน" },
            { label: "ตำแหน่งผู้ประเมิน", key: "evaluatorPosition", placeholder: "เช่น หัวหน้าช่าง" },
            { label: "รอบการประเมิน", key: "period", placeholder: "เช่น ประจำปี 2567 ครั้งที่ 1" },
            { label: "วันที่ประเมิน", key: "evalDate", type: "date" },
          ].map(({ label, key, placeholder, type }) => (
            <div key={key}>
              <label style={{ fontSize: 11, color: "#64748b", fontWeight: 600, display: "block", marginBottom: 4 }}>{label}</label>
              <input
                type={type || "text"} value={info[key]}
                onChange={(e) => setInfoField(key, e.target.value)}
                placeholder={placeholder}
                style={{ width: "100%", boxSizing: "border-box", padding: "8px 11px", border: "1.5px solid #cbd5e1", borderRadius: 8, fontSize: 13, fontFamily: "inherit", color: "#1e293b", outline: "none" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Spider Chart (live) */}
      <SpiderChart scores={scores} />

      {/* Section Tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, overflowX: "auto", paddingBottom: 2 }}>
        {SECTIONS.map((s) => {
          const cIds = s.groups.flatMap((g) => g.criteria.map((c) => c.id));
          const done = cIds.filter((id) => scores[id]).length;
          const isActive = activeSection === s.id;
          return (
            <button key={s.id} onClick={() => setActiveSection(s.id)}
              style={{
                padding: "7px 14px", borderRadius: 8, border: isActive ? `2px solid ${s.color}` : "1.5px solid #e2e8f0",
                background: isActive ? s.color : "#fff", color: isActive ? "#fff" : "#475569",
                fontWeight: 600, fontSize: 12, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit",
                transition: "all 0.15s",
              }}>
              {s.icon} {s.labelShort}
              <span style={{ marginLeft: 5, fontSize: 10, opacity: 0.8 }}>({done}/{cIds.length})</span>
            </button>
          );
        })}
      </div>

      {/* Active Section */}
      {SECTIONS.filter((s) => s.id === activeSection).map((sec) => (
        <div key={sec.id} style={{ background: "#fff", border: `1.5px solid ${sec.color}30`, borderRadius: 12, padding: "18px 22px", marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: sec.color, marginBottom: 14, paddingBottom: 8, borderBottom: `2px solid ${sec.color}20` }}>
            {sec.icon} {sec.label}
            <span style={{ fontSize: 11, fontWeight: 400, color: "#94a3b8", marginLeft: 8 }}>น้ำหนัก {sec.weight}%</span>
          </div>

          {sec.groups.map((grp) => (
            <div key={grp.id}>
              {grp.label && (
                <div style={{ fontSize: 12, fontWeight: 700, color: "#475569", background: "#f1f5f9", borderRadius: 6, padding: "5px 10px", marginBottom: 12 }}>
                  {grp.label}
                </div>
              )}
              {grp.criteria.map((c) => (
                <div key={c.id} style={{ marginBottom: 16, padding: "12px 14px", background: "#f8fafc", borderRadius: 10, border: "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: "#1e293b" }}>{c.label}</div>
                      <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{c.desc}</div>
                    </div>
                    {scores[c.id] && (
                      <span style={{ fontSize: 11, fontWeight: 700, color: SCORE_META[scores[c.id]].color, background: SCORE_META[scores[c.id]].bg, borderRadius: 20, padding: "2px 10px", marginLeft: 8, whiteSpace: "nowrap" }}>
                        {scores[c.id]} — {SCORE_META[scores[c.id]].label}
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 8 }}>
                    {[1, 2, 3, 4, 5].map((v) => (
                      <ScoreBtn key={v} value={v} selected={scores[c.id] === v} onClick={(val) => setScore(c.id, val)} />
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="หมายเหตุ/ข้อเสนอแนะเฉพาะด้านนี้ (ไม่บังคับ)"
                    value={comments[c.id] || ""}
                    onChange={(e) => setComment(c.id, e.target.value)}
                    style={{ width: "100%", boxSizing: "border-box", padding: "6px 10px", border: "1px solid #cbd5e1", borderRadius: 7, fontSize: 12, fontFamily: "inherit", background: "#fff", color: "#475569" }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}

      {/* Progress */}
      <div style={{ background: "#f8fafc", borderRadius: 10, padding: "12px 16px", marginBottom: 16, border: "1px solid #e2e8f0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: "#64748b" }}>ความคืบหน้า</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#1e3a5f" }}>{scoredCount}/{allCriteria.length} หัวข้อ</span>
        </div>
        <div style={{ background: "#e2e8f0", borderRadius: 99, height: 6 }}>
          <div style={{ background: "#1e3a5f", borderRadius: 99, height: 6, width: `${(scoredCount / allCriteria.length) * 100}%`, transition: "width 0.3s" }} />
        </div>
        {allScored && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: grade.color }}>{totalScore.toFixed(1)}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: grade.color }}>{grade.label} ({grade.letter})</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>{grade.sub}</div>
            </div>
          </div>
        )}
      </div>

      {/* General comment */}
      <div style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
        <label style={{ fontSize: 13, fontWeight: 700, color: "#1e3a5f", display: "block", marginBottom: 8 }}>💬 ความเห็นโดยรวม / แผนพัฒนาพนักงาน</label>
        <textarea rows={4} value={generalComment} onChange={(e) => setGeneralComment(e.target.value)}
          placeholder="จุดเด่น, จุดที่ควรพัฒนา, แผนการฝึกอบรมเพิ่มเติม..."
          style={{ width: "100%", boxSizing: "border-box", padding: "9px 12px", border: "1.5px solid #cbd5e1", borderRadius: 8, fontSize: 13, fontFamily: "inherit", resize: "vertical", color: "#1e293b" }}
        />
      </div>

      <button
        onClick={() => canSubmit && onSubmit({ info, scores, comments, generalComment }, totalScore, grade)}
        style={{
          width: "100%", padding: "14px", borderRadius: 10, border: "none",
          background: canSubmit ? "#1e3a5f" : "#cbd5e1",
          color: canSubmit ? "#fff" : "#94a3b8",
          fontSize: 15, fontWeight: 700, cursor: canSubmit ? "pointer" : "not-allowed", fontFamily: "inherit",
        }}>
        {canSubmit ? "✅ ดูใบ Transcript ผลการประเมิน" : `กรอกข้อมูลให้ครบ (${scoredCount}/${allCriteria.length} หัวข้อ)`}
      </button>
    </div>
  );
}

// ─── Transcript ─────────────────────────────────────────────────────────────
function Transcript({ payload, totalScore, grade, onBack }) {
  const { info, scores, comments, generalComment } = payload;
  const evalDate = info.evalDate
    ? new Date(info.evalDate).toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" })
    : "";

  return (
    <div style={{ fontFamily: "Sarabun, Noto Sans Thai, sans-serif" }}>
      {/* Toolbar */}
      <div className="no-print" style={{ background: "#1e3a5f", padding: "11px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <button onClick={onBack} style={{ background: "transparent", border: "1.5px solid rgba(255,255,255,0.35)", color: "#fff", padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>
          ← แก้ไข
        </button>
        <span style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>ใบ Transcript ผลการประเมินพนักงาน</span>
        <button onClick={() => window.print()} style={{ background: "#f59e0b", border: "none", color: "#1e3a5f", padding: "7px 16px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit" }}>
          🖨️ พิมพ์ / PDF
        </button>
      </div>

      <div style={{ maxWidth: 800, margin: "24px auto", padding: "0 16px 48px" }}>
        {/* Company Header */}
        <div style={{ textAlign: "center", borderBottom: "3px solid #1e3a5f", paddingBottom: 14, marginBottom: 18 }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: "#1e3a5f" }}>{COMPANY.name}</div>
          <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>ประกอบกิจการ: {COMPANY.business}</div>
          <div style={{ fontSize: 11, color: "#64748b" }}>หมวดธุรกิจ: {COMPANY.category}</div>
          <div style={{ marginTop: 10, fontSize: 15, fontWeight: 700, color: "#1e3a5f", letterSpacing: 0.5 }}>
            ใบรับรองผลการประเมินพนักงาน (EMPLOYEE EVALUATION TRANSCRIPT)
          </div>
          <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>โปรแกรม LAKE</div>
        </div>

        {/* Employee Info grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, background: "#f8fafc", borderRadius: 10, padding: 14, border: "1px solid #e2e8f0", marginBottom: 18 }}>
          {[
            ["ชื่อ-นามสกุล", info.employeeName],
            ["รหัสพนักงาน", info.employeeId || "-"],
            ["ตำแหน่ง", info.position],
            ["แผนก/หน่วยงาน", info.department || "-"],
            ["ผู้ประเมิน", info.evaluator],
            ["ตำแหน่งผู้ประเมิน", info.evaluatorPosition || "-"],
            ["รอบการประเมิน", info.period || "-"],
            ["วันที่ประเมิน", evalDate],
          ].map(([l, v]) => (
            <div key={l} style={{ display: "flex", gap: 6, alignItems: "baseline" }}>
              <span style={{ fontSize: 11, color: "#64748b", fontWeight: 600, minWidth: 110 }}>{l}:</span>
              <span style={{ fontSize: 12, color: "#1e293b", fontWeight: 500 }}>{v}</span>
            </div>
          ))}
        </div>

        {/* Spider Chart in transcript */}
        <SpiderChart scores={scores} />

        {/* Section tables */}
        {SECTIONS.map((sec) => {
          const cIds = sec.groups.flatMap((g) => g.criteria.map((c) => c.id));
          const secAvg = cIds.map((id) => scores[id] || 0).reduce((a, b) => a + b, 0) / cIds.length;
          const secScore = ((secAvg / 5) * sec.weight).toFixed(1);
          return (
            <div key={sec.id} style={{ marginBottom: 18 }}>
              <div style={{ background: sec.color, color: "#fff", borderRadius: "8px 8px 0 0", padding: "8px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 700, fontSize: 13 }}>{sec.icon} {sec.label}</span>
                <span style={{ fontSize: 11, opacity: 0.85 }}>น้ำหนัก {sec.weight}% | คะแนนหมวดนี้ {secScore}/{sec.weight}</span>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ background: `${sec.color}15` }}>
                    <th style={{ padding: "7px 12px", textAlign: "left", border: "1px solid #e2e8f0" }}>หัวข้อ</th>
                    <th style={{ padding: "7px 8px", textAlign: "center", width: 60, border: "1px solid #e2e8f0" }}>คะแนน</th>
                    <th style={{ padding: "7px 8px", textAlign: "center", width: 90, border: "1px solid #e2e8f0" }}>ระดับ</th>
                    <th style={{ padding: "7px 12px", textAlign: "left", border: "1px solid #e2e8f0" }}>หมายเหตุ</th>
                  </tr>
                </thead>
                <tbody>
                  {sec.groups.flatMap((g) => [
                    g.label && (
                      <tr key={`grp-${g.id}`} style={{ background: "#f8fafc" }}>
                        <td colSpan={4} style={{ padding: "5px 12px", fontSize: 11, fontWeight: 700, color: "#475569", border: "1px solid #e2e8f0" }}>
                          └ {g.label}
                        </td>
                      </tr>
                    ),
                    ...g.criteria.map((c, i) => {
                      const s = scores[c.id] || 0;
                      return (
                        <tr key={c.id} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                          <td style={{ padding: "7px 12px", border: "1px solid #e2e8f0" }}>
                            <div style={{ fontWeight: 600 }}>{c.label}</div>
                            <div style={{ fontSize: 10, color: "#94a3b8" }}>{c.desc}</div>
                          </td>
                          <td style={{ padding: "7px 8px", textAlign: "center", fontWeight: 800, fontSize: 15, color: s ? SCORE_META[s].color : "#cbd5e1", border: "1px solid #e2e8f0" }}>{s || "—"}</td>
                          <td style={{ padding: "7px 8px", textAlign: "center", fontSize: 11, fontWeight: 600, color: s ? SCORE_META[s].color : "#cbd5e1", border: "1px solid #e2e8f0" }}>{s ? SCORE_META[s].label : "—"}</td>
                          <td style={{ padding: "7px 12px", fontSize: 11, color: "#475569", border: "1px solid #e2e8f0" }}>{comments[c.id] || "-"}</td>
                        </tr>
                      );
                    }),
                  ].filter(Boolean))}
                </tbody>
              </table>
            </div>
          );
        })}

        {/* Total Result */}
        <div style={{ border: `2.5px solid ${grade.color}`, borderRadius: 12, padding: "14px 20px", marginBottom: 18, display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ textAlign: "center", minWidth: 80 }}>
            <div style={{ fontSize: 42, fontWeight: 800, color: grade.color, lineHeight: 1 }}>{totalScore.toFixed(1)}</div>
            <div style={{ fontSize: 10, color: "#94a3b8" }}>คะแนนรวม / 100</div>
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: grade.color }}>{grade.label} ({grade.letter})</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 3 }}>{grade.sub}</div>
            <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 6 }}>
              เกณฑ์: 90–100 = ดีเยี่ยม (A) &nbsp;|&nbsp; 80–89 = ดี (B) &nbsp;|&nbsp; 70–79 = ปานกลาง (C) &nbsp;|&nbsp; &lt;70 = ต้องปรับปรุง (D)
            </div>
          </div>
        </div>

        {/* Section summary bar */}
        <div style={{ background: "#f8fafc", borderRadius: 10, padding: "12px 16px", marginBottom: 18, border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#1e3a5f", marginBottom: 10 }}>สรุปคะแนนแต่ละหมวด</div>
          {SECTIONS.map((sec) => {
            const cIds = sec.groups.flatMap((g) => g.criteria.map((c) => c.id));
            const avg = cIds.map((id) => scores[id] || 0).reduce((a, b) => a + b, 0) / cIds.length;
            const pct = (avg / 5) * 100;
            return (
              <div key={sec.id} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 3 }}>
                  <span style={{ color: "#475569" }}>{sec.icon} {sec.labelShort}</span>
                  <span style={{ fontWeight: 700, color: sec.color }}>{avg.toFixed(2)} / 5</span>
                </div>
                <div style={{ background: "#e2e8f0", borderRadius: 99, height: 7 }}>
                  <div style={{ background: sec.color, borderRadius: 99, height: 7, width: `${pct}%`, transition: "width 0.3s" }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* General comment */}
        {generalComment && (
          <div style={{ background: "#f8fafc", borderRadius: 10, padding: "12px 16px", marginBottom: 18, border: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#1e3a5f", marginBottom: 6 }}>ความเห็นโดยรวม / แผนพัฒนาพนักงาน</div>
            <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.8 }}>{generalComment}</div>
          </div>
        )}

        {/* Signatures */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 32 }}>
          {[
            { title: "ผู้ถูกประเมิน", name: info.employeeName, sub: info.position },
            { title: "ผู้ประเมิน", name: info.evaluator, sub: info.evaluatorPosition },
          ].map(({ title, name, sub }) => (
            <div key={title} style={{ textAlign: "center", borderTop: "2px solid #1e3a5f", paddingTop: 12 }}>
              <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>ลงชื่อ ........................................</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}>({name})</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>{sub || title}</div>
              <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 3 }}>วันที่ ........................................</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 24, fontSize: 10, color: "#cbd5e1", borderTop: "1px solid #f1f5f9", paddingTop: 10 }}>
          เอกสารนี้ออกโดยระบบโปรแกรม LAKE • {COMPANY.name}
        </div>
      </div>
      <style>{`@media print { .no-print { display: none !important; } }`}</style>
    </div>
  );
}

// ─── App ────────────────────────────────────────────────────────────────────
export default function App() {
  const [result, setResult] = useState(null);
  if (result) {
    return <Transcript payload={result.payload} totalScore={result.totalScore} grade={result.grade} onBack={() => setResult(null)} />;
  }
  return (
    <EvaluationForm
      onSubmit={(payload, totalScore, grade) => setResult({ payload, totalScore, grade })}
    />
  );
}
