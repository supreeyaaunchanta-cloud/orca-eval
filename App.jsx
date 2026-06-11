import { useState } from "react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip
} from "recharts";

const COMPANY = {
  name: "บริษัท ออร์ก้า ซับคอนแทรค แอนด์ คอนซัลแทนท์ จำกัด",
  business: "ยกระดับคุณภาพงานซ่อมสีและตัวถังรถยนต์ โดยใช้ทีมช่างผู้เชี่ยวชาญเฉพาะทางและเลือกใช้ผลิตภัณฑ์คุณภาพสูง",
  category: "การบำรุงรักษาและการซ่อมตัวถัง ประตู หน้าต่าง และอื่น ๆ ที่คล้ายกัน",
};

const LOGO = "data:image/jpeg;base64,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";

const BRANCHES = [
  "ฟอร์ด อเมริกัน มอเตอร์ส (เชียงใหม่)",
  "อิซูซุ ธารา (เชียงใหม่)",
  "เอ็มจี (เชียงใหม่)",
  "ฮอนด้า (ตาก)",
  "ฮอนด้า (ตาก สาขาแม่สอด)",
  "โตโยต้า (พะเยา)",
  "โตโยต้า (เชียงราย)",
  "โตโยต้า (เชียงราย สาขาบ้านดู่)",
  "โตโยต้าริช (เชียงใหม่)",
];

const POSITIONS = {
  management: ["ผู้ช่วยผู้จัดการทั่วไป","เจ้าหน้าที่บริหารข้อมูล","เจ้าหน้าที่ธุรการทั่วไปส่วนกลาง","เจ้าหน้าที่การเงิน และบัญชี","เจ้าหน้าที่ทรัพยากรบุคคล","เจ้าหน้าที่จัดซื้อ","เจ้าหน้าที่เทคนิคส่วนกลาง"],
  supervisor: ["ผู้จัดการเขต","ผู้จัดการสาขา","ผู้ช่วยผู้จัดการสาขา","พนักงานควบคุมงานซ่อม","เจ้าหน้าที่ธุรการสาขา","เจ้าหน้าที่อะไหล่และสโตร์","เจ้าหน้าที่ตรวจสอบคุณภาพ"],
  technician: ["ช่างซ่อมตัวถัง ระดับ 2","ช่างซ่อมตัวถัง ระดับ 1","ช่างเตรียมพื้น ระดับ 2","ช่างเตรียมพื้น ระดับ 1","ช่างพ่นสี","ช่างผสมสี","ช่างถอดประกอบ ระดับ 2","ช่างถอดประกอบ ระดับ 1","ช่างขัดสี-ขัดเงา"],
  general: ["พนักงานล้างรถ-เก็บงาน","พนักงานฝึกงาน","แม่บ้าน"],
};

const GROUP_LABELS = {
  management: "ฝ่ายบริหาร",
  supervisor: "ฝ่ายจัดการ",
  technician: "ช่างเทคนิค",
  general: "พนักงานทั่วไป",
};

function getPositionGroup(pos) {
  for (const [group, list] of Object.entries(POSITIONS)) {
    if (list.includes(pos)) return group;
  }
  return null;
}

// ─── Sections per group ─────────────────────────────────────────────────────
const SECTIONS_BY_GROUP = {
  // ช่างเทคนิค — เน้น hard skills + safety
  technician: [
    {
      id: "hard", label: "ส่วนที่ 1: ทักษะความเชี่ยวชาญเฉพาะด้าน", labelShort: "Hard Skills",
      icon: "🔧", color: "#1e3a5f", weight: 40,
      groups: [
        { id: "body", label: "ช่างเคาะ / ช่างตัวถัง", criteria: [
          { id: "h1", label: "การคืนรูปตัวถัง", desc: "ซ่อมแซมชิ้นงานให้กลับคืนรูปเดิมตามมาตรฐานโรงงาน" },
          { id: "h2", label: "การใช้เครื่องมือ", desc: "ความชำนาญในการใช้เครื่องมือดึงตัวถัง เครื่องเชื่อม และอุปกรณ์ต่างๆ" },
          { id: "h3", label: "ความเรียบร้อยของพื้นผิว", desc: "การโป๊วสี เก็บรายละเอียดพื้นผิวได้เรียบเนียนก่อนส่งมอบงาน" },
        ]},
        { id: "paint", label: "ช่างพ่นสี", criteria: [
          { id: "h4", label: "การเทียบสีและผสมสี", desc: "ความแม่นยำในการผสมสีให้ตรงกับตัวรถเดิม ไม่ผิดเฉด" },
          { id: "h5", label: "เทคนิคการพ่นสี", desc: "ลงสีได้สม่ำเสมอ ไม่มีรอยด่าง สีไหล หรือเม็ดฝุ่น" },
          { id: "h6", label: "การอบและขัดเงา", desc: "อบสีตามอุณหภูมิที่กำหนด ขัดเคลือบเงาได้สมบูรณ์" },
        ]},
      ],
    },
    {
      id: "productivity", label: "ส่วนที่ 2: ประสิทธิภาพในการทำงาน", labelShort: "Productivity",
      icon: "⚡", color: "#0369a1", weight: 25,
      groups: [{ id: "prod", label: "", criteria: [
        { id: "p1", label: "ระยะเวลาในการทำงาน", desc: "ทำงานเสร็จสิ้นตามกำหนดเวลา (Turnaround Time / Estimate Time)" },
        { id: "p2", label: "อัตราการซ่อมซ้ำ (Rework Rate)", desc: "ทำงานจบในรอบเดียว ไม่ต้องแก้ไขซ้ำหรือมีงานเคลมซ้ำซ้อน" },
        { id: "p3", label: "การจัดการวัสดุ", desc: "ใช้วัสดุสิ้นเปลือง (สี, กระดาษทราย, ทินเนอร์) คุ้มค่า ไม่สูญเปล่า" },
      ]}],
    },
    {
      id: "safety", label: "ส่วนที่ 3: กฎระเบียบ ความปลอดภัย และสิ่งแวดล้อม", labelShort: "Safety & 5S",
      icon: "🦺", color: "#b45309", weight: 25,
      groups: [{ id: "safe", label: "", criteria: [
        { id: "s1", label: "อุปกรณ์ป้องกัน (PPE)", desc: "สวมหน้ากากกันสารเคมี แว่นตา และอุปกรณ์เซฟตี้ขณะปฏิบัติงาน" },
        { id: "s2", label: "การจัดการพื้นที่ 5S", desc: "จัดเก็บเครื่องมือ ทำความสะอาดห้องพ่นสี ดูแลพื้นที่หน้างานหลังเลิกงาน" },
        { id: "s3", label: "การปฏิบัติตามกฎ", desc: "เคร่งครัดในมาตรฐานความปลอดภัย ป้องกันอุบัติเหตุและอัคคีภัย" },
      ]}],
    },
    {
      id: "soft", label: "ส่วนที่ 4: การทำงานร่วมกันและพฤติกรรม", labelShort: "Soft Skills",
      icon: "🤝", color: "#065f46", weight: 10,
      groups: [{ id: "soft", label: "", criteria: [
        { id: "w1", label: "การทำงานเป็นทีม", desc: "ประสานงานกับช่างส่วนอื่นๆ ได้ดี" },
        { id: "w2", label: "ความรับผิดชอบ", desc: "ซื่อสัตย์ต่อหน้าที่ มีความกระตือรือร้นในการแก้ไขปัญหา" },
        { id: "w3", label: "การรับฟังข้อเสนอแนะ", desc: "นำคำแนะนำของหัวหน้างานหรือลูกค้ามาปรับปรุงงาน" },
      ]}],
    },
  ],

  // ฝ่ายจัดการสาขา — เน้น การจัดการ + soft skills
  supervisor: [
    {
      id: "mgmt_skill", label: "ส่วนที่ 1: ทักษะการจัดการ", labelShort: "Management",
      icon: "📋", color: "#1e3a5f", weight: 35,
      groups: [{ id: "mgmt", label: "", criteria: [
        { id: "m1", label: "การวางแผนและควบคุมงาน", desc: "วางแผนงานซ่อม จัดลำดับความสำคัญ และติดตามผลได้อย่างมีประสิทธิภาพ" },
        { id: "m2", label: "การบริหารทีมช่าง", desc: "มอบหมายงาน ดูแล และพัฒนาทักษะช่างในทีมได้ดี" },
        { id: "m3", label: "การแก้ไขปัญหาเฉพาะหน้า", desc: "แก้ไขปัญหาที่เกิดขึ้นได้รวดเร็ว ตัดสินใจถูกต้องภายใต้แรงกดดัน" },
      ]}],
    },
    {
      id: "customer", label: "ส่วนที่ 2: การบริการและลูกค้า", labelShort: "Customer",
      icon: "🌟", color: "#0369a1", weight: 25,
      groups: [{ id: "cust", label: "", criteria: [
        { id: "c1", label: "การสื่อสารกับลูกค้า", desc: "อธิบายรายละเอียดงานซ่อม ราคา และระยะเวลาได้ชัดเจน" },
        { id: "c2", label: "การจัดการข้อร้องเรียน", desc: "รับมือข้อร้องเรียนได้อย่างมืออาชีพ หาทางออกที่พึงพอใจทั้งสองฝ่าย" },
        { id: "c3", label: "ความพึงพอใจของลูกค้า", desc: "ลูกค้ากลับมาใช้บริการซ้ำ มีรีวิวเชิงบวก" },
      ]}],
    },
    {
      id: "productivity", label: "ส่วนที่ 3: ประสิทธิภาพและตัวชี้วัด", labelShort: "KPI",
      icon: "⚡", color: "#b45309", weight: 25,
      groups: [{ id: "kpi", label: "", criteria: [
        { id: "k1", label: "การบรรลุเป้าหมายรายได้", desc: "สาขาทำรายได้ได้ตามเป้าหมายที่กำหนด" },
        { id: "k2", label: "การควบคุมต้นทุน", desc: "บริหารค่าใช้จ่ายวัสดุและทรัพยากรให้อยู่ในงบประมาณ" },
        { id: "k3", label: "ระยะเวลาส่งมอบงาน", desc: "บริหารจัดการให้งานเสร็จตรงเวลาในภาพรวมของสาขา" },
      ]}],
    },
    {
      id: "soft", label: "ส่วนที่ 4: ภาวะผู้นำและพฤติกรรม", labelShort: "Leadership",
      icon: "🤝", color: "#065f46", weight: 15,
      groups: [{ id: "lead", label: "", criteria: [
        { id: "w1", label: "ภาวะผู้นำ", desc: "สร้างแรงบันดาลใจ จูงใจทีม และเป็นแบบอย่างที่ดี" },
        { id: "w2", label: "การสื่อสารภายในองค์กร", desc: "ประสานงานกับสำนักงานใหญ่และสาขาอื่นๆ ได้ดี" },
        { id: "w3", label: "การพัฒนาตนเอง", desc: "เรียนรู้สิ่งใหม่ และนำความรู้มาประยุกต์ใช้กับงาน" },
      ]}],
    },
  ],

  // ฝ่ายบริหาร — เน้น soft skills + ประสิทธิภาพ
  management: [
    {
      id: "prof_skill", label: "ส่วนที่ 1: ทักษะวิชาชีพ", labelShort: "Professional",
      icon: "💼", color: "#1e3a5f", weight: 30,
      groups: [{ id: "prof", label: "", criteria: [
        { id: "pr1", label: "ความรู้และความเชี่ยวชาญในงาน", desc: "มีความรู้ในสายงานของตนเองอย่างลึกซึ้ง นำไปใช้งานได้จริง" },
        { id: "pr2", label: "ความถูกต้องแม่นยำของงาน", desc: "งานที่ส่งมอบมีความถูกต้อง ครบถ้วน ไม่ต้องแก้ไขบ่อย" },
        { id: "pr3", label: "การใช้เทคโนโลยีและระบบ", desc: "ใช้งานโปรแกรมและระบบที่เกี่ยวข้องกับงานได้อย่างมีประสิทธิภาพ" },
      ]}],
    },
    {
      id: "productivity", label: "ส่วนที่ 2: ประสิทธิภาพในการทำงาน", labelShort: "Productivity",
      icon: "⚡", color: "#0369a1", weight: 30,
      groups: [{ id: "prod", label: "", criteria: [
        { id: "p1", label: "การบริหารเวลา", desc: "จัดลำดับความสำคัญของงาน ส่งงานตรงเวลา" },
        { id: "p2", label: "ปริมาณงานที่ทำสำเร็จ", desc: "ผลงานที่ทำเสร็จสมบูรณ์ได้ตามเป้าหมายที่กำหนด" },
        { id: "p3", label: "ความคิดริเริ่มและการพัฒนา", desc: "เสนอแนวทางปรับปรุง หรือแก้ไขปัญหาโดยไม่ต้องรอคำสั่ง" },
      ]}],
    },
    {
      id: "soft", label: "ส่วนที่ 3: การทำงานร่วมกันและการสื่อสาร", labelShort: "Soft Skills",
      icon: "🤝", color: "#065f46", weight: 25,
      groups: [{ id: "soft", label: "", criteria: [
        { id: "w1", label: "การทำงานเป็นทีม", desc: "ประสานงานและให้ความช่วยเหลือเพื่อนร่วมงานได้ดี" },
        { id: "w2", label: "การสื่อสาร", desc: "สื่อสารได้ชัดเจน ทั้งพูด เขียน และการนำเสนอ" },
        { id: "w3", label: "การรับฟังและปรับตัว", desc: "รับฟังความคิดเห็น และปรับตัวกับการเปลี่ยนแปลงได้ดี" },
      ]}],
    },
    {
      id: "discipline", label: "ส่วนที่ 4: วินัยและความรับผิดชอบ", labelShort: "Discipline",
      icon: "✅", color: "#b45309", weight: 15,
      groups: [{ id: "disc", label: "", criteria: [
        { id: "d1", label: "การตรงต่อเวลา", desc: "มาทำงานตรงเวลา ไม่ขาดงานโดยไม่มีเหตุผล" },
        { id: "d2", label: "การปฏิบัติตามระเบียบ", desc: "ปฏิบัติตามกฎระเบียบและนโยบายขององค์กร" },
        { id: "d3", label: "ความซื่อสัตย์และจริยธรรม", desc: "มีจริยธรรมในการทำงาน ซื่อสัตย์ต่อองค์กรและเพื่อนร่วมงาน" },
      ]}],
    },
  ],

  // พนักงานทั่วไป — เน้นพฤติกรรม + ความปลอดภัย
  general: [
    {
      id: "work_quality", label: "ส่วนที่ 1: คุณภาพและปริมาณงาน", labelShort: "Quality",
      icon: "⭐", color: "#1e3a5f", weight: 35,
      groups: [{ id: "qual", label: "", criteria: [
        { id: "q1", label: "คุณภาพของงานที่ทำ", desc: "งานที่ทำมีคุณภาพตามมาตรฐานที่กำหนด ไม่ต้องแก้ไขซ้ำ" },
        { id: "q2", label: "ความรวดเร็วและปริมาณงาน", desc: "ทำงานได้ตามปริมาณที่คาดหวังภายในเวลาที่กำหนด" },
        { id: "q3", label: "ความพิถีพิถันและความใส่ใจ", desc: "ดูแลงานในรายละเอียด ไม่ปล่อยผ่านงานที่ไม่ได้มาตรฐาน" },
      ]}],
    },
    {
      id: "safety", label: "ส่วนที่ 2: ความปลอดภัยและระเบียบ", labelShort: "Safety",
      icon: "🦺", color: "#b45309", weight: 30,
      groups: [{ id: "safe", label: "", criteria: [
        { id: "s1", label: "การปฏิบัติตามกฎความปลอดภัย", desc: "สวมอุปกรณ์ป้องกันและปฏิบัติตามมาตรฐานความปลอดภัย" },
        { id: "s2", label: "การดูแลพื้นที่ทำงาน (5S)", desc: "รักษาความสะอาดและความเป็นระเบียบของพื้นที่รับผิดชอบ" },
        { id: "s3", label: "การดูแลรักษาอุปกรณ์", desc: "ใช้และดูแลรักษาอุปกรณ์อย่างถูกต้อง ไม่ทำให้เสียหาย" },
      ]}],
    },
    {
      id: "soft", label: "ส่วนที่ 3: พฤติกรรมและทัศนคติ", labelShort: "Behavior",
      icon: "🤝", color: "#065f46", weight: 20,
      groups: [{ id: "beh", label: "", criteria: [
        { id: "w1", label: "ความกระตือรือร้น", desc: "กระตือรือร้นในการทำงาน ไม่ต้องเร่งเตือนบ่อย" },
        { id: "w2", label: "การรับคำสั่งและปฏิบัติตาม", desc: "รับฟังคำสั่งและปฏิบัติตามได้ถูกต้อง" },
        { id: "w3", label: "มนุษยสัมพันธ์", desc: "เข้ากับเพื่อนร่วมงานได้ดี ไม่สร้างความขัดแย้ง" },
      ]}],
    },
    {
      id: "discipline", label: "ส่วนที่ 4: วินัยและความรับผิดชอบ", labelShort: "Discipline",
      icon: "✅", color: "#7c3aed", weight: 15,
      groups: [{ id: "disc", label: "", criteria: [
        { id: "d1", label: "การตรงต่อเวลา", desc: "มาทำงานตรงเวลา ไม่ขาดงานโดยไม่มีเหตุผล" },
        { id: "d2", label: "การปฏิบัติตามระเบียบ", desc: "ปฏิบัติตามกฎระเบียบและนโยบายขององค์กร" },
        { id: "d3", label: "ความรับผิดชอบต่อหน้าที่", desc: "รับผิดชอบงานของตนเองจนเสร็จสิ้น ไม่โยนความผิดให้ผู้อื่น" },
      ]}],
    },
  ],
};

const SCORE_META = {
  5: { label: "ดีเยี่ยม", color: "#16a34a", bg: "#dcfce7" },
  4: { label: "ดี", color: "#2563eb", bg: "#dbeafe" },
  3: { label: "ปานกลาง", color: "#d97706", bg: "#fef3c7" },
  2: { label: "ควรปรับปรุง", color: "#ea580c", bg: "#ffedd5" },
  1: { label: "ไม่ผ่านเกณฑ์", color: "#dc2626", bg: "#fee2e2" },
};

function getGrade(score) {
  if (score >= 90) return { label: "ดีเยี่ยม", sub: "ทักษะสูง ทำงานได้เกินมาตรฐาน", color: "#16a34a", letter: "A" };
  if (score >= 80) return { label: "ดี", sub: "ทำงานได้มาตรฐาน งานเสร็จตามกำหนด", color: "#2563eb", letter: "B" };
  if (score >= 70) return { label: "ปานกลาง", sub: "ต้องได้รับการอบรมเพิ่มเติมในบางทักษะ", color: "#d97706", letter: "C" };
  return { label: "ต้องปรับปรุง", sub: "ประสิทธิภาพต่ำกว่ามาตรฐาน", color: "#dc2626", letter: "D" };
}

function SpiderChart({ scores, sections }) {
  const data = sections.map((s) => {
    const cIds = s.groups.flatMap((g) => g.criteria.map((c) => c.id));
    const vals = cIds.map((id) => scores[id] || 0);
    const avg = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    return { subject: s.labelShort, value: parseFloat(avg.toFixed(2)), fullMark: 5 };
  });
  const hasData = data.some((d) => d.value > 0);
  return (
    <div style={{ background: "#fff", borderRadius: 12, border: "1.5px solid #e2e8f0", padding: "16px 8px 8px", marginBottom: 20 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a5f", marginBottom: 4, paddingLeft: 12 }}>📊 Spider Chart — ภาพรวมสมรรถนะ</div>
      <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 8, paddingLeft: 12 }}>{hasData ? "แสดงคะแนนเฉลี่ยแต่ละหมวด (1–5)" : "กรอกคะแนนเพื่อแสดงกราฟ"}</div>
      <ResponsiveContainer width="100%" height={260}>
        <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#475569", fontFamily: "Sarabun, sans-serif" }} />
          <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fontSize: 9, fill: "#94a3b8" }} tickCount={6} />
          <Tooltip formatter={(v) => [`${v} / 5`, "คะแนนเฉลี่ย"]} contentStyle={{ fontSize: 12, fontFamily: "Sarabun, sans-serif", borderRadius: 8 }} />
          <Radar name="คะแนน" dataKey="value" stroke="#1e3a5f" fill="#1e3a5f" fillOpacity={hasData ? 0.25 : 0} strokeWidth={2} dot={{ r: 4, fill: "#1e3a5f" }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

function ScoreBtn({ value, selected, onClick }) {
  const meta = SCORE_META[value];
  return (
    <button onClick={() => onClick(value)} title={meta.label}
      style={{ width: 38, height: 38, borderRadius: 7, border: selected ? `2px solid ${meta.color}` : "1.5px solid #d1d5db", background: selected ? meta.bg : "#f9fafb", color: selected ? meta.color : "#6b7280", fontWeight: 700, fontSize: 15, cursor: "pointer", transition: "all 0.12s" }}>
      {value}
    </button>
  );
}

function EvaluationForm({ onSubmit }) {
  const today = new Date().toISOString().slice(0, 10);
  const [info, setInfo] = useState({ employeeName: "", employeeId: "", position: "", branch: "", evaluator: "", evaluatorPosition: "", period: "", evalDate: today });
  const [scores, setScores] = useState({});
  const [comments, setComments] = useState({});
  const [generalComment, setGeneralComment] = useState("");
  const [activeSection, setActiveSection] = useState(null);

  const setInfoField = (k, v) => {
    setInfo((f) => ({ ...f, [k]: v }));
    if (k === "position") { setScores({}); setComments({}); setActiveSection(null); }
  };

  const posGroup = getPositionGroup(info.position);
  const sections = posGroup ? SECTIONS_BY_GROUP[posGroup] : null;
  const allCriteria = sections ? sections.flatMap((s) => s.groups.flatMap((g) => g.criteria)) : [];
  const scoredCount = allCriteria.filter((c) => scores[c.id]).length;
  const allScored = allCriteria.length > 0 && scoredCount === allCriteria.length;
  const currentSection = activeSection || (sections ? sections[0].id : null);

  const totalScore = sections ? sections.reduce((acc, sec) => {
    const cIds = sec.groups.flatMap((g) => g.criteria.map((c) => c.id));
    const avg = cIds.map((id) => scores[id] || 0).reduce((a, b) => a + b, 0) / cIds.length;
    return acc + (avg / 5) * sec.weight;
  }, 0) : 0;

  const canSubmit = info.employeeName && info.position && info.branch && info.evaluator && allScored;
  const grade = getGrade(totalScore);

  return (
    <div style={{ maxWidth: 780, margin: "0 auto", padding: "20px 14px 40px", fontFamily: "Sarabun, Noto Sans Thai, sans-serif" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#1e3a5f 0%,#0f2240 100%)", borderRadius: 14, padding: "22px 24px", marginBottom: 22, color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <img src={LOGO} alt="ORCA Logo" style={{ width: 46, height: 46, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 10, letterSpacing: 1.5, opacity: 0.6, textTransform: "uppercase", marginBottom: 2 }}>ระบบประเมินพนักงาน</div>
            <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.3 }}>{COMPANY.name}</div>
          </div>
        </div>
        <div style={{ fontSize: 11, opacity: 0.55 }}>หมวดธุรกิจ: {COMPANY.category}</div>
      </div>

      {/* Info */}
      <div style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 12, padding: "18px 22px", marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a5f", marginBottom: 14, paddingBottom: 8, borderBottom: "2px solid #f1f5f9" }}>📋 ข้อมูลพนักงานและผู้ประเมิน</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { label: "ชื่อ-นามสกุลพนักงาน *", key: "employeeName", placeholder: "กรอกชื่อพนักงาน" },
            { label: "รหัสพนักงาน", key: "employeeId", placeholder: "เช่น NS1234567" },
            { label: "ตำแหน่ง *", key: "position", type: "select_position" },
            { label: "สาขา *", key: "branch", type: "select_branch" },
            { label: "ชื่อผู้ประเมิน *", key: "evaluator", placeholder: "กรอกชื่อผู้ประเมิน" },
            { label: "ตำแหน่งผู้ประเมิน", key: "evaluatorPosition", placeholder: "เช่น หัวหน้าช่าง" },
            { label: "รอบการประเมิน", key: "period", placeholder: "เช่น ประจำปี 2569 ครั้งที่ 1" },
            { label: "วันที่ประเมิน", key: "evalDate", type: "date" },
          ].map(({ label, key, placeholder, type }) => (
            <div key={key}>
              <label style={{ fontSize: 11, color: "#64748b", fontWeight: 600, display: "block", marginBottom: 4 }}>{label}</label>
              {type === "select_position" ? (
                <select value={info[key]} onChange={(e) => setInfoField(key, e.target.value)}
                  style={{ width: "100%", boxSizing: "border-box", padding: "8px 11px", border: "1.5px solid #cbd5e1", borderRadius: 8, fontSize: 13, fontFamily: "inherit", color: info[key] ? "#1e293b" : "#94a3b8", outline: "none", background: "#fff", cursor: "pointer" }}>
                  <option value="">— เลือกตำแหน่ง —</option>
                  {Object.entries(POSITIONS).map(([grp, list]) => (
                    <optgroup key={grp} label={GROUP_LABELS[grp]}>
                      {list.map((p) => <option key={p}>{p}</option>)}
                    </optgroup>
                  ))}
                </select>
              ) : type === "select_branch" ? (
                <select value={info[key]} onChange={(e) => setInfoField(key, e.target.value)}
                  style={{ width: "100%", boxSizing: "border-box", padding: "8px 11px", border: "1.5px solid #cbd5e1", borderRadius: 8, fontSize: 13, fontFamily: "inherit", color: info[key] ? "#1e293b" : "#94a3b8", outline: "none", background: "#fff", cursor: "pointer" }}>
                  <option value="">— เลือกสาขา —</option>
                  {BRANCHES.map((b) => <option key={b}>{b}</option>)}
                </select>
              ) : (
                <input type={type || "text"} value={info[key]} onChange={(e) => setInfoField(key, e.target.value)} placeholder={placeholder}
                  style={{ width: "100%", boxSizing: "border-box", padding: "8px 11px", border: "1.5px solid #cbd5e1", borderRadius: 8, fontSize: 13, fontFamily: "inherit", color: "#1e293b", outline: "none" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Position group badge */}
      {posGroup && (
        <div style={{ background: "#f0f9ff", border: "1.5px solid #bae6fd", borderRadius: 10, padding: "10px 16px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 13 }}>ℹ️</span>
          <div>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#0369a1" }}>กลุ่ม{GROUP_LABELS[posGroup]}</span>
            <span style={{ fontSize: 12, color: "#64748b" }}> — ใช้แบบประเมินเฉพาะตำแหน่งนี้</span>
          </div>
        </div>
      )}

      {sections && (
        <>
          <SpiderChart scores={scores} sections={sections} />

          {/* Tabs */}
          <div style={{ display: "flex", gap: 6, marginBottom: 16, overflowX: "auto", paddingBottom: 2 }}>
            {sections.map((s) => {
              const cIds = s.groups.flatMap((g) => g.criteria.map((c) => c.id));
              const done = cIds.filter((id) => scores[id]).length;
              const isActive = currentSection === s.id;
              return (
                <button key={s.id} onClick={() => setActiveSection(s.id)}
                  style={{ padding: "7px 14px", borderRadius: 8, border: isActive ? `2px solid ${s.color}` : "1.5px solid #e2e8f0", background: isActive ? s.color : "#fff", color: isActive ? "#fff" : "#475569", fontWeight: 600, fontSize: 12, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit", transition: "all 0.15s" }}>
                  {s.icon} {s.labelShort} ({done}/{cIds.length})
                </button>
              );
            })}
          </div>

          {/* Active section */}
          {sections.filter((s) => s.id === currentSection).map((sec) => (
            <div key={sec.id} style={{ background: "#fff", border: `1.5px solid ${sec.color}30`, borderRadius: 12, padding: "18px 22px", marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: sec.color, marginBottom: 14, paddingBottom: 8, borderBottom: `2px solid ${sec.color}20` }}>
                {sec.icon} {sec.label} <span style={{ fontSize: 11, fontWeight: 400, color: "#94a3b8", marginLeft: 8 }}>น้ำหนัก {sec.weight}%</span>
              </div>
              {sec.groups.map((grp) => (
                <div key={grp.id}>
                  {grp.label && <div style={{ fontSize: 12, fontWeight: 700, color: "#475569", background: "#f1f5f9", borderRadius: 6, padding: "5px 10px", marginBottom: 12 }}>└ {grp.label}</div>}
                  {grp.criteria.map((c) => (
                    <div key={c.id} style={{ marginBottom: 16, padding: "12px 14px", background: "#f8fafc", borderRadius: 10, border: "1px solid #e2e8f0" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 13, color: "#1e293b" }}>{c.label}</div>
                          <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{c.desc}</div>
                        </div>
                        {scores[c.id] && <span style={{ fontSize: 11, fontWeight: 700, color: SCORE_META[scores[c.id]].color, background: SCORE_META[scores[c.id]].bg, borderRadius: 20, padding: "2px 10px", marginLeft: 8, whiteSpace: "nowrap" }}>{scores[c.id]} — {SCORE_META[scores[c.id]].label}</span>}
                      </div>
                      <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 8 }}>
                        {[1,2,3,4,5].map((v) => <ScoreBtn key={v} value={v} selected={scores[c.id] === v} onClick={(val) => setScores((s) => ({ ...s, [c.id]: val }))} />)}
                      </div>
                      <input type="text" placeholder="หมายเหตุ/ข้อเสนอแนะเฉพาะด้านนี้ (ไม่บังคับ)" value={comments[c.id] || ""} onChange={(e) => setComments((cm) => ({ ...cm, [c.id]: e.target.value }))}
                        style={{ width: "100%", boxSizing: "border-box", padding: "6px 10px", border: "1px solid #cbd5e1", borderRadius: 7, fontSize: 12, fontFamily: "inherit", background: "#fff", color: "#475569" }} />
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
              <div style={{ background: "#1e3a5f", borderRadius: 99, height: 6, width: `${allCriteria.length ? (scoredCount/allCriteria.length)*100 : 0}%`, transition: "width 0.3s" }} />
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
        </>
      )}

      {!sections && info.position === "" && (
        <div style={{ background: "#f8fafc", border: "1.5px dashed #cbd5e1", borderRadius: 12, padding: "32px", textAlign: "center", marginBottom: 20, color: "#94a3b8" }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>👆</div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>กรุณาเลือกตำแหน่งก่อน</div>
          <div style={{ fontSize: 12, marginTop: 4 }}>แบบประเมินจะเปลี่ยนตามกลุ่มตำแหน่งที่เลือก</div>
        </div>
      )}

      <div style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
        <label style={{ fontSize: 13, fontWeight: 700, color: "#1e3a5f", display: "block", marginBottom: 8 }}>💬 ความเห็นโดยรวม / แผนพัฒนาพนักงาน</label>
        <textarea rows={4} value={generalComment} onChange={(e) => setGeneralComment(e.target.value)} placeholder="จุดเด่น, จุดที่ควรพัฒนา, แผนการฝึกอบรมเพิ่มเติม..."
          style={{ width: "100%", boxSizing: "border-box", padding: "9px 12px", border: "1.5px solid #cbd5e1", borderRadius: 8, fontSize: 13, fontFamily: "inherit", resize: "vertical", color: "#1e293b" }} />
      </div>

      <button onClick={() => canSubmit && onSubmit({ info, scores, comments, generalComment, sections, posGroup }, totalScore, grade)}
        style={{ width: "100%", padding: "14px", borderRadius: 10, border: "none", background: canSubmit ? "#1e3a5f" : "#cbd5e1", color: canSubmit ? "#fff" : "#94a3b8", fontSize: 15, fontWeight: 700, cursor: canSubmit ? "pointer" : "not-allowed", fontFamily: "inherit" }}>
        {canSubmit ? "✅ ดูใบ Transcript ผลการประเมิน" : `กรอกข้อมูลให้ครบ (${scoredCount}/${allCriteria.length} หัวข้อ)`}
      </button>
    </div>
  );
}

function Transcript({ payload, totalScore, grade, onBack }) {
  const { info, scores, comments, generalComment, sections } = payload;
  const evalDate = info.evalDate ? new Date(info.evalDate).toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" }) : "";
  const posGroup = getPositionGroup(info.position);

  return (
    <div style={{ fontFamily: "Sarabun, Noto Sans Thai, sans-serif" }}>
      <div className="no-print" style={{ background: "#1e3a5f", padding: "11px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <button onClick={onBack} style={{ background: "transparent", border: "1.5px solid rgba(255,255,255,0.35)", color: "#fff", padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>← แก้ไข</button>
        <span style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>ใบ Transcript ผลการประเมินพนักงาน</span>
        <button onClick={() => window.print()} style={{ background: "#f59e0b", border: "none", color: "#1e3a5f", padding: "7px 16px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit" }}>🖨️ พิมพ์ / PDF</button>
      </div>

      <div style={{ maxWidth: 800, margin: "24px auto", padding: "0 16px 48px" }}>
        <div style={{ textAlign: "center", borderBottom: "3px solid #1e3a5f", paddingBottom: 14, marginBottom: 18 }}>
          <img src={LOGO} alt="ORCA" style={{ width: 70, height: 70, borderRadius: 12, objectFit: "cover", marginBottom: 8 }} />
          <div style={{ fontSize: 17, fontWeight: 800, color: "#1e3a5f" }}>{COMPANY.name}</div>
          <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>ประกอบกิจการ: {COMPANY.business}</div>
          <div style={{ marginTop: 10, fontSize: 15, fontWeight: 700, color: "#1e3a5f", letterSpacing: 0.5 }}>ใบรับรองผลการประเมินพนักงาน (EMPLOYEE EVALUATION TRANSCRIPT)</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, background: "#f8fafc", borderRadius: 10, padding: 14, border: "1px solid #e2e8f0", marginBottom: 18 }}>
          {[
            ["ชื่อ-นามสกุล", info.employeeName],
            ["รหัสพนักงาน", info.employeeId || "-"],
            ["ตำแหน่ง", info.position],
            ["กลุ่มตำแหน่ง", GROUP_LABELS[posGroup] || "-"],
            ["สาขา", info.branch],
            ["ผู้ประเมิน", info.evaluator],
            ["ตำแหน่งผู้ประเมิน", info.evaluatorPosition || "-"],
            ["รอบการประเมิน", info.period || "-"],
            ["วันที่ประเมิน", evalDate],
          ].map(([l, v]) => (
            <div key={l} style={{ display: "flex", gap: 6, alignItems: "baseline" }}>
              <span style={{ fontSize: 11, color: "#64748b", fontWeight: 600, minWidth: 120 }}>{l}:</span>
              <span style={{ fontSize: 12, color: "#1e293b", fontWeight: 500 }}>{v}</span>
            </div>
          ))}
        </div>

        <SpiderChart scores={scores} sections={sections} />

        {sections.map((sec) => {
          const cIds = sec.groups.flatMap((g) => g.criteria.map((c) => c.id));
          const secAvg = cIds.map((id) => scores[id] || 0).reduce((a, b) => a + b, 0) / cIds.length;
          const secScore = ((secAvg / 5) * sec.weight).toFixed(1);
          return (
            <div key={sec.id} style={{ marginBottom: 18 }}>
              <div style={{ background: sec.color, color: "#fff", borderRadius: "8px 8px 0 0", padding: "8px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 700, fontSize: 13 }}>{sec.icon} {sec.label}</span>
                <span style={{ fontSize: 11, opacity: 0.85 }}>น้ำหนัก {sec.weight}% | คะแนน {secScore}/{sec.weight}</span>
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
                    g.label && <tr key={`g-${g.id}`} style={{ background: "#f8fafc" }}><td colSpan={4} style={{ padding: "5px 12px", fontSize: 11, fontWeight: 700, color: "#475569", border: "1px solid #e2e8f0" }}>└ {g.label}</td></tr>,
                    ...g.criteria.map((c, i) => {
                      const s = scores[c.id] || 0;
                      return (
                        <tr key={c.id} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                          <td style={{ padding: "7px 12px", border: "1px solid #e2e8f0" }}><div style={{ fontWeight: 600 }}>{c.label}</div><div style={{ fontSize: 10, color: "#94a3b8" }}>{c.desc}</div></td>
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

        <div style={{ border: `2.5px solid ${grade.color}`, borderRadius: 12, padding: "14px 20px", marginBottom: 18, display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ textAlign: "center", minWidth: 80 }}>
            <div style={{ fontSize: 42, fontWeight: 800, color: grade.color, lineHeight: 1 }}>{totalScore.toFixed(1)}</div>
            <div style={{ fontSize: 10, color: "#94a3b8" }}>คะแนนรวม / 100</div>
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: grade.color }}>{grade.label} ({grade.letter})</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 3 }}>{grade.sub}</div>
            <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 6 }}>เกณฑ์: 90–100 = ดีเยี่ยม (A) | 80–89 = ดี (B) | 70–79 = ปานกลาง (C) | &lt;70 = ต้องปรับปรุง (D)</div>
          </div>
        </div>

        <div style={{ background: "#f8fafc", borderRadius: 10, padding: "12px 16px", marginBottom: 18, border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#1e3a5f", marginBottom: 10 }}>สรุปคะแนนแต่ละหมวด</div>
          {sections.map((sec) => {
            const cIds = sec.groups.flatMap((g) => g.criteria.map((c) => c.id));
            const avg = cIds.map((id) => scores[id] || 0).reduce((a, b) => a + b, 0) / cIds.length;
            return (
              <div key={sec.id} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 3 }}>
                  <span style={{ color: "#475569" }}>{sec.icon} {sec.labelShort}</span>
                  <span style={{ fontWeight: 700, color: sec.color }}>{avg.toFixed(2)} / 5</span>
                </div>
                <div style={{ background: "#e2e8f0", borderRadius: 99, height: 7 }}>
                  <div style={{ background: sec.color, borderRadius: 99, height: 7, width: `${(avg/5)*100}%`, transition: "width 0.3s" }} />
                </div>
              </div>
            );
          })}
        </div>

        {generalComment && (
          <div style={{ background: "#f8fafc", borderRadius: 10, padding: "12px 16px", marginBottom: 18, border: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#1e3a5f", marginBottom: 6 }}>ความเห็นโดยรวม / แผนพัฒนาพนักงาน</div>
            <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.8 }}>{generalComment}</div>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 32 }}>
          {[{ name: info.employeeName, sub: info.position }, { name: info.evaluator, sub: info.evaluatorPosition }].map((p, i) => (
            <div key={i} style={{ textAlign: "center", borderTop: "2px solid #1e3a5f", paddingTop: 12 }}>
              <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>ลงชื่อ ........................................</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}>({p.name})</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>{p.sub || (i === 0 ? "ผู้ถูกประเมิน" : "ผู้ประเมิน")}</div>
              <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 3 }}>วันที่ ........................................</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 24, fontSize: 10, color: "#cbd5e1", borderTop: "1px solid #f1f5f9", paddingTop: 10 }}>
          เอกสารนี้ออกโดย {COMPANY.name}
        </div>
      </div>
      <style>{`@media print { .no-print { display: none !important; } }`}</style>
    </div>
  );
}

export default function App() {
  const [result, setResult] = useState(null);
  if (result) return <Transcript payload={result.payload} totalScore={result.totalScore} grade={result.grade} onBack={() => setResult(null)} />;
  return <EvaluationForm onSubmit={(payload, totalScore, grade) => setResult({ payload, totalScore, grade })} />;
}
