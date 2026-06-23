import { useState } from "react";

// ─── CONFIG ───────────────────────────────────────────────
const WA_URL = "https://wa.link/kynsyb";

const C = {
  bg: "#0F1117", card: "#1A1D2E", cardLight: "#232638", border: "#2D3149",
  orange: "#F97316", cyan: "#06B6D4", white: "#FFFFFF",
  gray: "#94A3B8", grayLight: "#CBD5E1",
  red: "#EF4444", green: "#22C55E", yellow: "#FBBF24",
};

const inputStyle = {
  background: "#232638", border: "1px solid #2D3149", borderRadius: "8px",
  color: "#F1F5F9", padding: "10px 14px", fontSize: "14px",
  width: "100%", outline: "none", fontFamily: "inherit", boxSizing: "border-box",
};
const labelStyle = {
  fontSize: "11px", fontWeight: "700", color: "#94A3B8",
  letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "6px",
};
const btnPrimary = {
  width: "100%", padding: "15px", borderRadius: "10px",
  background: `linear-gradient(135deg, #F97316, #EA580C)`,
  border: "none", color: "#FFFFFF", fontSize: "16px", fontWeight: "800",
  cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.02em",
};

function Field({ label, name, value, onChange, type = "text", prefix, placeholder, hint }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={labelStyle}>{label}</label>
      {hint && <p style={{ margin: "0 0 8px", fontSize: "12px", color: C.gray }}>{hint}</p>}
      <div style={{ position: "relative" }}>
        {prefix && (
          <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: C.orange, fontWeight: "700", fontSize: "11px", pointerEvents: "none", letterSpacing: "0.04em" }}>{prefix}</span>
        )}
        <input
          type={type} name={name} value={value} onChange={onChange} placeholder={placeholder || ""}
          style={{ ...inputStyle, paddingLeft: prefix ? "46px" : "14px", borderColor: focused ? C.cyan : "#2D3149" }}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        />
      </div>
    </div>
  );
}

function Card({ title, accent, children }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "12px", marginBottom: "18px", overflow: "hidden" }}>
      <div style={{ borderLeft: `4px solid ${accent}`, padding: "13px 18px", borderBottom: `1px solid ${C.border}`, background: "#1E2237" }}>
        <span style={{ fontSize: "11px", fontWeight: "800", color: accent, letterSpacing: "0.1em", textTransform: "uppercase" }}>{title}</span>
      </div>
      <div style={{ padding: "20px 18px" }}>{children}</div>
    </div>
  );
}

function ToggleGroup({ options, value, onChange }) {
  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      {options.map(opt => (
        <button key={opt.val} onClick={() => onChange(opt.val)} style={{
          padding: "8px 16px", borderRadius: "8px", fontWeight: "700", fontSize: "13px",
          cursor: "pointer", border: "1px solid", fontFamily: "inherit",
          borderColor: value === opt.val ? C.cyan : C.border,
          background: value === opt.val ? "#0e3d4a" : C.cardLight,
          color: value === opt.val ? C.cyan : C.gray,
        }}>{opt.label}</button>
      ))}
    </div>
  );
}

function Progress({ step }) {
  const steps = ["Tus datos", "Tu negocio", "Diagnóstico"];
  return (
    <div style={{ marginBottom: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", opacity: step >= i + 1 ? 1 : 0.35 }}>
            <div style={{
              width: "22px", height: "22px", borderRadius: "50%",
              background: step > i + 1 ? C.green : step === i + 1 ? C.orange : C.border,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "11px", fontWeight: "800", color: C.white, flexShrink: 0,
            }}>{step > i + 1 ? "✓" : i + 1}</div>
            <span style={{ fontSize: "11px", fontWeight: "700", color: step === i + 1 ? C.white : C.gray, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s}</span>
          </div>
        ))}
      </div>
      <div style={{ height: "3px", background: C.border, borderRadius: "2px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${((step - 1) / 2) * 100}%`, background: C.orange, transition: "width 0.4s ease" }} />
      </div>
    </div>
  );
}

function ErrorBox({ msg }) {
  return <div style={{ background: "#2d1515", border: `1px solid ${C.red}`, borderRadius: "8px", padding: "12px 16px", color: C.red, fontSize: "13px", marginBottom: "16px" }}>{msg}</div>;
}

function Header({ onAdmin }) {
  return (
    <div style={{ background: "#1A1D2E", borderBottom: `1px solid ${C.border}`, padding: "16px 24px", position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: "720px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
        <div>
          <div style={{ fontSize: "10px", fontWeight: "800", color: C.cyan, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "2px" }}>Tribu Finanzas en Acción</div>
          <div style={{ fontSize: "18px", fontWeight: "800", color: C.white }}>🧮 CFO Virtual</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ background: "#232638", border: `1px solid ${C.border}`, borderRadius: "20px", padding: "5px 13px", fontSize: "11px", color: C.orange, fontWeight: "700" }}>Diagnóstico Gratuito</div>
          <button onClick={onAdmin} style={{
            padding: "7px 14px", borderRadius: "8px", border: `1px solid ${C.border}`,
            background: C.cardLight, color: C.gray, fontSize: "12px", fontWeight: "700",
            cursor: "pointer", fontFamily: "inherit",
          }}>🔐 Admin</button>
        </div>
      </div>
    </div>
  );
}

function calcIndicators(f) {
  const v = parseFloat(f.ventas) || 0;
  const cv = parseFloat(f.costoVentas) || 0;
  const go = parseFloat(f.gastosOperativos) || 0;
  const pd = parseFloat(f.pagoDeudas) || 0;
  const sd = parseFloat(f.sueldoDueno) || 0;
  const ra = parseFloat(f.retiroAdicional) || 0;
  const inv = parseFloat(f.inventario) || 0;
  const disp = parseFloat(f.dineroDisponible) || 0;
  const m1 = parseFloat(f.mes1) || 0;
  const m2 = parseFloat(f.mes2) || 0;
  const m3 = parseFloat(f.mes3) || 0;

  const mb = v > 0 ? ((v - cv) / v) * 100 : 0;
  const totalEgresos = go + pd + sd + ra;
  const utilidad = (v - cv) - totalEgresos;
  const mo = v > 0 ? (utilidad / v) * 100 : 0;
  const liquidez = (go + pd) > 0 ? disp / (go + pd) : 99;
  const depInventario = v > 0 ? (inv / v) * 100 : 0;

  let tendencia = "ESTABLE";
  if (m1 && m2 && m3) {
    const avg23 = (m2 + m3) / 2;
    if (m1 > avg23 * 1.05) tendencia = "CRECIENTE";
    else if (m1 < avg23 * 0.95) tendencia = "DECRECIENTE";
  }

  let riesgoScore = 0;
  if (mb < 20) riesgoScore += 3; else if (mb < 35) riesgoScore += 1;
  if (mo < 0) riesgoScore += 3; else if (mo < 8) riesgoScore += 1;
  if (liquidez < 1) riesgoScore += 3; else if (liquidez < 2) riesgoScore += 1;
  if (f.finanzasSeparadas === "no") riesgoScore += 1;
  if (tendencia === "DECRECIENTE") riesgoScore += 2;
  if (utilidad < 0) riesgoScore += 3;

  const riesgo = riesgoScore >= 6 ? "ALTO" : riesgoScore >= 3 ? "MEDIO" : "BAJO";
  const riesgoColor = riesgo === "ALTO" ? C.red : riesgo === "MEDIO" ? C.yellow : C.green;

  const alertas = [];
  if (mb < 20) alertas.push({ tipo: "CRÍTICA", msg: "Margen bruto muy bajo — casi no te queda dinero después de pagar lo que vendes.", color: C.red });
  if (mo < 0) alertas.push({ tipo: "CRÍTICA", msg: "Estás operando en pérdida — gastas más de lo que ganas.", color: C.red });
  if (liquidez < 1) alertas.push({ tipo: "CRÍTICA", msg: "Liquidez crítica — no tienes efectivo suficiente para cubrir un mes de operaciones.", color: C.red });
  if (f.finanzasSeparadas === "no") alertas.push({ tipo: "IMPORTANTE", msg: "Finanzas mezcladas con lo personal — es imposible saber con precisión cuánto gana tu negocio.", color: C.yellow });
  if (f.finanzasSeparadas === "parcial") alertas.push({ tipo: "ATENCIÓN", msg: "Tus finanzas están parcialmente mezcladas con lo personal — esto distorsiona tus números reales.", color: C.yellow });
  if (tendencia === "DECRECIENTE") alertas.push({ tipo: "IMPORTANTE", msg: "Tus ventas están bajando en los últimos 3 meses.", color: C.yellow });
  if (depInventario > 60) alertas.push({ tipo: "IMPORTANTE", msg: "Demasiado capital atrapado en inventario — dinero que no trabaja para ti.", color: C.yellow });
  if (f.duenoCobra === "no") alertas.push({ tipo: "ATENCIÓN", msg: "El dueño no se paga sueldo — el negocio puede parecer rentable cuando en realidad no lo es.", color: C.yellow });
  if (pd > 0 && v > 0 && (pd / v) > 0.20) alertas.push({ tipo: "IMPORTANTE", msg: "Tus pagos de deuda representan más del 20% de tus ventas — carga financiera alta.", color: C.yellow });

  const fortalezas = [];
  if (mb >= 40) fortalezas.push("Margen bruto saludable — tu producto o servicio tiene buen valor.");
  if (liquidez >= 3) fortalezas.push("Buena reserva de efectivo — tienes colchón para imprevistos.");
  if (tendencia === "CRECIENTE") fortalezas.push("Tus ventas están creciendo — hay momentum positivo en el negocio.");
  if (f.finanzasSeparadas === "si") fortalezas.push("Finanzas separadas — eso ya te pone adelante del 80% de los negocios pequeños.");
  if (mo >= 15) fortalezas.push("Margen operativo sólido — el negocio genera utilidad real.");

  return { mb, mo, liquidez, depInventario, tendencia, riesgo, riesgoColor, alertas, fortalezas, utilidad };
}

const emptyForm = {
  tipoNegocio: "", productos: "", empleados: "",
  ventas: "", costoVentas: "", gastosOperativos: "", pagoDeudas: "",
  inventario: "", dineroDisponible: "",
  duenoCobra: "si", sueldoDueno: "", retiroAdicional: "",
  mes1: "", mes2: "", mes3: "",
  finanzasSeparadas: "no", problemaActual: "",
};

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  if (showAdmin) return <AdminPanel onExit={() => setShowAdmin(false)} />;
  return <CFOVirtual onAdmin={() => setShowAdmin(true)} />;
}

function CFOVirtual({ onAdmin }) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [contacto, setContacto] = useState({ nombre: "", pais: "", whatsapp: "", moneda: "MXN" });
  const [form, setForm] = useState(emptyForm);
  const [diagnostico, setDiagnostico] = useState(null);
  const [aiSummary, setAiSummary] = useState("");

  const handleContacto = e => setContacto(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleForm = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const saveLead = async (ind) => {
    try {
      const key = `lead-${Date.now()}`;
      const data = {
        fecha: new Date().toISOString(),
        nombre: contacto.nombre,
        pais: contacto.pais,
        whatsapp: contacto.whatsapp,
        moneda: contacto.moneda,
        negocio: form.tipoNegocio,
        ventas: form.ventas,
        riesgo: ind.riesgo,
        alertas: ind.alertas.length,
        finanzasSeparadas: form.finanzasSeparadas,
        problema: form.problemaActual,
      };
      await window.storage.set(key, JSON.stringify(data), true);
    } catch (e) { /* silent */ }
  };

  const handleAnalyze = async () => {
    if (!form.ventas || !form.costoVentas) {
      setError("Por favor ingresa al menos ventas y costo de ventas.");
      return;
    }
    setError("");
    setIsLoading(true);
    setStep(3);

    const ind = calcIndicators(form);
    setDiagnostico(ind);
    await saveLead(ind);

    try {
      const prompt = `Eres un CFO experto en pequeñas empresas de Latinoamérica. Escribe un DIAGNÓSTICO breve para el dueño de este negocio.

DATOS:
- Negocio: ${form.tipoNegocio || "No especificado"}
- Moneda: ${contacto.moneda}
- Ventas mensuales: ${contacto.moneda} ${form.ventas}
- Costo de ventas: $${form.costoVentas}
- Gastos operativos: $${form.gastosOperativos || "0"}
- Margen bruto: ${ind.mb.toFixed(1)}%
- Margen operativo: ${ind.mo.toFixed(1)}%
- Liquidez: ${ind.liquidez.toFixed(1)} meses
- Tendencia de ventas: ${ind.tendencia}
- Riesgo financiero: ${ind.riesgo}
- Finanzas separadas del negocio: ${form.finanzasSeparadas}
- Problema principal del dueño: ${form.problemaActual || "No especificado"}
- Alertas detectadas: ${ind.alertas.map(a => a.msg).join("; ")}

INSTRUCCIONES:
- Máximo 3 párrafos cortos (máximo 110 palabras en total)
- Habla directo al dueño ("tu negocio", "estás")
- Describe QUÉ está pasando, NO cómo resolverlo
- Sé honesto sin asustar innecesariamente
- Sin términos técnicos complejos
- Cierra mencionando que hay áreas que necesitan atención profesional, sin decir cuáles exactamente`;

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      setAiSummary(data.content?.map(b => b.text || "").join("") || "");
    } catch (e) {
      setAiSummary("");
    }
    setIsLoading(false);
  };

  const handleReset = () => {
    setStep(1); setDiagnostico(null); setAiSummary("");
    setContacto({ nombre: "", pais: "", whatsapp: "", moneda: "MXN" }); setForm(emptyForm);
  };

  // ── STEP 1: CONTACTO ──────────────────────────────────
  if (step === 1) return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.white }}>
      <Header onAdmin={onAdmin} />
      <div style={{ maxWidth: "560px", margin: "0 auto", padding: "24px 16px" }}>
        <Progress step={1} />
        <div style={{ background: "linear-gradient(135deg, #1E2237, #232638)", border: `1px solid ${C.border}`, borderLeft: `4px solid ${C.orange}`, borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
          <p style={{ margin: 0, fontSize: "15px", color: C.grayLight, lineHeight: "1.7" }}>
            Completa este diagnóstico financiero gratuito y descubre en minutos <strong style={{ color: C.orange }}>dónde están las alertas en tu negocio.</strong>
          </p>
        </div>
        <Card title="Tus datos de contacto" accent={C.cyan}>
          <Field label="Tu nombre" name="nombre" value={contacto.nombre} onChange={handleContacto} placeholder="¿Cómo te llamas?" />
          <Field label="País" name="pais" value={contacto.pais} onChange={handleContacto} placeholder="México, Colombia, Argentina..." />
          <Field label="Tu WhatsApp (con código de país)" name="whatsapp" value={contacto.whatsapp} onChange={handleContacto} placeholder="+52 444 123 4567" hint="Te compartiremos tu diagnóstico y podremos darte seguimiento personalizado." />

          {/* Currency selector */}
          <div style={{ marginBottom: "4px" }}>
            <label style={labelStyle}>¿En qué moneda vas a ingresar tus números?</label>
            <p style={{ margin: "0 0 10px", fontSize: "12px", color: C.gray }}>
              Todos los campos del formulario usarán esta moneda.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {[
                { val: "MXN", label: "🇲🇽 MXN — Peso mexicano" },
                { val: "COP", label: "🇨🇴 COP — Peso colombiano" },
                { val: "ARS", label: "🇦🇷 ARS — Peso argentino" },
                { val: "CLP", label: "🇨🇱 CLP — Peso chileno" },
                { val: "PEN", label: "🇵🇪 PEN — Sol peruano" },
                { val: "USD", label: "🇺🇸 USD — Dólar" },
                { val: "GTQ", label: "🇬🇹 GTQ — Quetzal" },
                { val: "HNL", label: "🇭🇳 HNL — Lempira" },
                { val: "CRC", label: "🇨🇷 CRC — Colón" },
                { val: "BOB", label: "🇧🇴 BOB — Boliviano" },
                { val: "PYG", label: "🇵🇾 PYG — Guaraní" },
                { val: "DOP", label: "🇩🇴 DOP — Peso dominicano" },
                { val: "Otro", label: "🌐 Otra moneda" },
              ].map(opt => (
                <button key={opt.val} onClick={() => setContacto(p => ({ ...p, moneda: opt.val }))} style={{
                  padding: "7px 13px", borderRadius: "8px", fontWeight: "700", fontSize: "12px",
                  cursor: "pointer", border: "1px solid", fontFamily: "inherit",
                  borderColor: contacto.moneda === opt.val ? C.cyan : C.border,
                  background: contacto.moneda === opt.val ? "#0e3d4a" : C.cardLight,
                  color: contacto.moneda === opt.val ? C.cyan : C.gray,
                  transition: "all 0.15s",
                }}>{opt.label}</button>
              ))}
            </div>
          </div>
        </Card>
        {error && <ErrorBox msg={error} />}
        <button style={btnPrimary} onClick={() => {
          if (!contacto.nombre || !contacto.whatsapp) { setError("Por favor ingresa tu nombre y WhatsApp."); return; }
          setError(""); setStep(2);
        }}>Continuar → Ingresar datos del negocio</button>
        <p style={{ textAlign: "center", fontSize: "11px", color: C.gray, marginTop: "14px" }}>🔒 Tu información es privada y solo será usada para tu diagnóstico.</p>
      </div>
    </div>
  );

  // ── STEP 2: FORMULARIO FINANCIERO ─────────────────────
  if (step === 2) return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.white }}>
      <Header onAdmin={onAdmin} />
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "24px 16px" }}>
        <Progress step={2} />
        <p style={{ margin: "0 0 20px", fontSize: "15px", color: C.grayLight }}>
          Hola <strong style={{ color: C.white }}>{contacto.nombre}</strong> — ingresa los números de tu negocio. No tienen que ser exactos, usa aproximados.
        </p>

        {/* Currency reminder pill */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#0e3d4a", border: `1px solid ${C.cyan}`, borderRadius: "20px", padding: "6px 14px", marginBottom: "20px" }}>
          <span style={{ fontSize: "13px", color: C.cyan }}>💱</span>
          <span style={{ fontSize: "12px", fontWeight: "700", color: C.cyan }}>Todos los montos en: <strong>{contacto.moneda}</strong></span>
          <button onClick={() => setStep(1)} style={{ background: "none", border: "none", color: C.gray, fontSize: "11px", cursor: "pointer", padding: 0, fontFamily: "inherit", textDecoration: "underline" }}>cambiar</button>
        </div>

        <Card title="Información General" accent={C.cyan}>
          <Field label="Tipo de negocio" name="tipoNegocio" value={form.tipoNegocio} onChange={handleForm} placeholder="Restaurante, tienda, consultoría, taller..." />
          <Field label="Principales productos o servicios" name="productos" value={form.productos} onChange={handleForm} placeholder="Ropa, refacciones, cursos, servicios..." />
          <Field label="Número de empleados (sin contar al dueño)" name="empleados" value={form.empleados} onChange={handleForm} type="number" placeholder="0" />
        </Card>

        <Card title="Números Mensuales" accent={C.orange}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <Field label="Ventas mensuales promedio" name="ventas" value={form.ventas} onChange={handleForm} type="number" prefix={contacto.moneda} placeholder="0" hint="Todo lo que cobras en un mes típico" />
            <Field label="Costo de lo que vendes" name="costoVentas" value={form.costoVentas} onChange={handleForm} type="number" prefix={contacto.moneda} placeholder="0" hint="Materias primas, mercancía, insumos directos" />
            <Field label="Gastos operativos mensuales" name="gastosOperativos" value={form.gastosOperativos} onChange={handleForm} type="number" prefix={contacto.moneda} placeholder="0" hint="Renta, nómina, servicios, publicidad..." />
            <Field label="Pago mensual de deudas o créditos" name="pagoDeudas" value={form.pagoDeudas} onChange={handleForm} type="number" prefix={contacto.moneda} placeholder="0" hint="Bancos, préstamos, tarjetas del negocio" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <Field label="Inventario actual (si aplica)" name="inventario" value={form.inventario} onChange={handleForm} type="number" prefix={contacto.moneda} placeholder="0" hint="Valor aproximado de mercancía en existencia" />
            <Field label="Dinero en caja o banco hoy" name="dineroDisponible" value={form.dineroDisponible} onChange={handleForm} type="number" prefix={contacto.moneda} placeholder="0" hint="Lo que tienes disponible ahora mismo" />
          </div>
        </Card>

        <Card title="Ingresos del Dueño" accent={C.yellow}>
          <div style={{ marginBottom: "14px" }}>
            <label style={labelStyle}>¿Te pagas un sueldo fijo del negocio?</label>
            <ToggleGroup options={[{ val: "si", label: "✅ Sí me pago" }, { val: "no", label: "❌ No me pago" }]} value={form.duenoCobra} onChange={v => setForm(p => ({ ...p, duenoCobra: v }))} />
          </div>
          {form.duenoCobra === "si" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
              <Field label="Tu sueldo mensual fijo" name="sueldoDueno" value={form.sueldoDueno} onChange={handleForm} type="number" prefix={contacto.moneda} />
              <Field label="Retiros adicionales al mes" name="retiroAdicional" value={form.retiroAdicional} onChange={handleForm} type="number" prefix={contacto.moneda} hint="Dinero extra que sacas del negocio" />
            </div>
          )}
        </Card>

        <Card title="Tendencia de Ventas — Últimos 3 Meses" accent={C.cyan}>
          <p style={{ margin: "0 0 14px", fontSize: "13px", color: C.gray, lineHeight: "1.5" }}>
            💡 Ingresa el <strong style={{ color: C.grayLight }}>total de ventas</strong> (dinero que ingresó) de cada mes — no utilidades, solo lo que vendiste.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 16px" }}>
            <Field label="Ventas de este mes" name="mes1" value={form.mes1} onChange={handleForm} type="number" prefix={contacto.moneda} placeholder="Mes actual" />
            <Field label="Ventas del mes pasado" name="mes2" value={form.mes2} onChange={handleForm} type="number" prefix={contacto.moneda} placeholder="Hace 1 mes" />
            <Field label="Ventas de hace 2 meses" name="mes3" value={form.mes3} onChange={handleForm} type="number" prefix={contacto.moneda} placeholder="Hace 2 meses" />
          </div>
        </Card>

        <Card title="Salud Financiera General" accent={C.cyan}>
          <div style={{ marginBottom: "6px" }}>
            <label style={labelStyle}>¿Tienes las finanzas del negocio separadas de las personales?</label>
            <p style={{ margin: "0 0 12px", fontSize: "12px", color: C.gray }}>Cuenta bancaria diferente, tarjeta distinta, registros separados, etc.</p>
            <ToggleGroup
              options={[{ val: "si", label: "✅ Sí, separadas" }, { val: "parcial", label: "⚠️ Parcialmente" }, { val: "no", label: "❌ Mezcladas" }]}
              value={form.finanzasSeparadas}
              onChange={v => setForm(p => ({ ...p, finanzasSeparadas: v }))}
            />
          </div>
        </Card>

        <Card title="Tu Situación Actual" accent={C.red}>
          <label style={labelStyle}>¿Cuál es tu principal problema financiero hoy?</label>
          <textarea name="problemaActual" value={form.problemaActual} onChange={handleForm} rows={3}
            placeholder="Ej: No me queda dinero aunque vendo bien, no sé si gano o pierdo, tengo muchas deudas..."
            style={{ ...inputStyle, resize: "vertical", lineHeight: "1.6" }} />
        </Card>

        {error && <ErrorBox msg={error} />}
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={() => setStep(1)} style={{ flex: "0 0 auto", padding: "15px 20px", borderRadius: "10px", border: `1px solid ${C.border}`, background: C.cardLight, color: C.gray, fontSize: "14px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" }}>← Atrás</button>
          <button onClick={handleAnalyze} style={{ ...btnPrimary, flex: 1 }} disabled={isLoading}>
            {isLoading ? "⏳ Generando diagnóstico..." : "🧠 Ver mi diagnóstico financiero"}
          </button>
        </div>
      </div>
    </div>
  );

  // ── STEP 3: DIAGNÓSTICO ───────────────────────────────
  const ind = diagnostico;

  const semaforo = ind ? [
    { label: "Margen Bruto", value: `${ind.mb.toFixed(1)}%`, desc: ind.mb >= 40 ? "Saludable" : ind.mb >= 25 ? "Regular" : "Bajo", color: ind.mb >= 40 ? C.green : ind.mb >= 25 ? C.yellow : C.red, icon: ind.mb >= 40 ? "🟢" : ind.mb >= 25 ? "🟡" : "🔴" },
    { label: "Margen Operativo", value: `${ind.mo.toFixed(1)}%`, desc: ind.mo >= 12 ? "Saludable" : ind.mo >= 0 ? "Ajustado" : "En pérdida", color: ind.mo >= 12 ? C.green : ind.mo >= 0 ? C.yellow : C.red, icon: ind.mo >= 12 ? "🟢" : ind.mo >= 0 ? "🟡" : "🔴" },
    { label: "Liquidez", value: ind.liquidez >= 99 ? "∞ meses" : `${ind.liquidez.toFixed(1)} meses`, desc: ind.liquidez >= 3 ? "Buena reserva" : ind.liquidez >= 1 ? "Justa" : "Crítica", color: ind.liquidez >= 3 ? C.green : ind.liquidez >= 1 ? C.yellow : C.red, icon: ind.liquidez >= 3 ? "🟢" : ind.liquidez >= 1 ? "🟡" : "🔴" },
    { label: "Tendencia Ventas", value: ind.tendencia, desc: ind.tendencia === "CRECIENTE" ? "Vas subiendo" : ind.tendencia === "ESTABLE" ? "Sin cambio" : "Vas bajando", color: ind.tendencia === "CRECIENTE" ? C.green : ind.tendencia === "ESTABLE" ? C.yellow : C.red, icon: ind.tendencia === "CRECIENTE" ? "🟢" : ind.tendencia === "ESTABLE" ? "🟡" : "🔴" },
  ] : [];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.white }}>
      <Header onAdmin={onAdmin} />
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "24px 16px" }}>
        <Progress step={3} />

        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ margin: "0 0 6px", fontSize: "22px", fontWeight: "800" }}>
            Diagnóstico de <span style={{ color: C.orange }}>{contacto.nombre}</span>
          </h2>
          <p style={{ margin: 0, fontSize: "13px", color: C.gray }}>{form.tipoNegocio || "Tu negocio"} · {contacto.moneda} · CFO Virtual IA · Tribu Finanzas en Acción</p>
        </div>

        {/* Riesgo global */}
        {ind && (
          <div style={{ background: `${ind.riesgoColor}15`, border: `2px solid ${ind.riesgoColor}`, borderRadius: "12px", padding: "18px 20px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ background: ind.riesgoColor, borderRadius: "50%", width: "52px", height: "52px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>
              {ind.riesgo === "ALTO" ? "⚠️" : ind.riesgo === "MEDIO" ? "🔔" : "✅"}
            </div>
            <div>
              <div style={{ fontSize: "11px", fontWeight: "800", color: ind.riesgoColor, letterSpacing: "0.1em", textTransform: "uppercase" }}>Nivel de Riesgo Financiero</div>
              <div style={{ fontSize: "26px", fontWeight: "900", color: C.white, lineHeight: 1.1 }}>{ind.riesgo}</div>
              <div style={{ fontSize: "13px", color: C.gray, marginTop: "2px" }}>
                {ind.riesgo === "ALTO" ? "Tu negocio necesita atención urgente en varias áreas." : ind.riesgo === "MEDIO" ? "Hay áreas importantes que mejorar antes de que se vuelvan críticas." : "Tu negocio tiene una base sólida, con oportunidades de mejora."}
              </div>
            </div>
          </div>
        )}

        {/* Semáforo */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
          {semaforo.map((s, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: `3px solid ${s.color}`, borderRadius: "10px", padding: "14px" }}>
              <div style={{ fontSize: "10px", fontWeight: "700", color: C.gray, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>{s.label}</div>
              <div style={{ fontSize: "22px", fontWeight: "900", color: s.color, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: "12px", color: C.gray, marginTop: "4px" }}>{s.icon} {s.desc}</div>
            </div>
          ))}
        </div>

        {/* Finanzas separadas badge */}
        {form.finanzasSeparadas !== "si" && (
          <div style={{ background: "#2d1f00", border: `1px solid ${C.yellow}`, borderRadius: "10px", padding: "12px 16px", marginBottom: "16px", display: "flex", gap: "10px", alignItems: "flex-start" }}>
            <span style={{ fontSize: "18px", flexShrink: 0 }}>⚠️</span>
            <p style={{ margin: 0, fontSize: "13px", color: C.grayLight, lineHeight: "1.6" }}>
              <strong style={{ color: C.yellow }}>Finanzas {form.finanzasSeparadas === "no" ? "mezcladas" : "parcialmente mezcladas"} con lo personal.</strong>{" "}
              {form.finanzasSeparadas === "no" ? "Esto hace imposible saber con exactitud cuánto gana realmente tu negocio." : "Aún hay mezcla que distorsiona tus números reales."}
            </p>
          </div>
        )}

        {/* AI Narrative */}
        {isLoading ? (
          <div style={{ textAlign: "center", padding: "30px", background: C.card, borderRadius: "12px", marginBottom: "16px" }}>
            <div style={{ width: "36px", height: "36px", border: `3px solid ${C.border}`, borderTop: `3px solid ${C.orange}`, borderRadius: "50%", margin: "0 auto 12px", animation: "spin 0.8s linear infinite" }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ color: C.gray, margin: 0, fontSize: "13px" }}>Analizando la situación de tu negocio...</p>
          </div>
        ) : aiSummary ? (
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `4px solid ${C.cyan}`, borderRadius: "10px", padding: "18px 20px", marginBottom: "16px" }}>
            <div style={{ fontSize: "11px", fontWeight: "800", color: C.cyan, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>📋 Diagnóstico de tu situación</div>
            <p style={{ margin: 0, fontSize: "14px", color: C.grayLight, lineHeight: "1.8" }}>{aiSummary}</p>
          </div>
        ) : null}

        {/* Alertas */}
        {ind && ind.alertas.length > 0 && (
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "10px", marginBottom: "16px", overflow: "hidden" }}>
            <div style={{ padding: "13px 18px", borderBottom: `1px solid ${C.border}`, background: "#1E2237" }}>
              <span style={{ fontSize: "11px", fontWeight: "800", color: C.red, letterSpacing: "0.1em", textTransform: "uppercase" }}>🚨 {ind.alertas.length} Alerta{ind.alertas.length > 1 ? "s" : ""} Detectada{ind.alertas.length > 1 ? "s" : ""}</span>
            </div>
            <div style={{ padding: "16px 18px" }}>
              {ind.alertas.map((a, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", paddingBottom: i < ind.alertas.length - 1 ? "12px" : 0, marginBottom: i < ind.alertas.length - 1 ? "12px" : 0, borderBottom: i < ind.alertas.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ flexShrink: 0, padding: "2px 8px", borderRadius: "20px", fontSize: "10px", fontWeight: "800", background: `${a.color}20`, color: a.color, letterSpacing: "0.05em", marginTop: "1px" }}>{a.tipo}</div>
                  <p style={{ margin: 0, fontSize: "13px", color: C.grayLight, lineHeight: "1.6" }}>{a.msg}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fortalezas */}
        {ind && ind.fortalezas.length > 0 && (
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "10px", marginBottom: "20px", overflow: "hidden" }}>
            <div style={{ padding: "13px 18px", borderBottom: `1px solid ${C.border}`, background: "#1E2237" }}>
              <span style={{ fontSize: "11px", fontWeight: "800", color: C.green, letterSpacing: "0.1em", textTransform: "uppercase" }}>✅ Lo que va bien</span>
            </div>
            <div style={{ padding: "16px 18px" }}>
              {ind.fortalezas.slice(0, 2).map((f, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", marginBottom: i < ind.fortalezas.slice(0,2).length - 1 ? "10px" : 0 }}>
                  <span style={{ color: C.green, flexShrink: 0 }}>›</span>
                  <p style={{ margin: 0, fontSize: "13px", color: C.grayLight, lineHeight: "1.6" }}>{f}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* El cómo es el servicio */}
        <div style={{ background: "linear-gradient(135deg, #1A1D2E, #1E2237)", border: `1px solid ${C.border}`, borderLeft: `4px solid ${C.orange}`, borderRadius: "10px", padding: "18px 20px", marginBottom: "24px" }}>
          <p style={{ margin: "0 0 6px", fontSize: "13px", fontWeight: "800", color: C.orange, textTransform: "uppercase", letterSpacing: "0.06em" }}>🔒 ¿Y ahora cómo lo resuelvo?</p>
          <p style={{ margin: 0, fontSize: "14px", color: C.grayLight, lineHeight: "1.7" }}>
            Este diagnóstico te muestra <strong style={{ color: C.white }}>qué está pasando</strong> en tu negocio.
            El siguiente paso — saber <strong style={{ color: C.white }}>cómo corregirlo</strong> con un plan de acción real — es exactamente lo que hacemos en el servicio de <strong style={{ color: C.orange }}>Administración Financiera</strong>: ordenamos tus números, te damos claridad total y construimos contigo el plan para llegar donde quieres.
          </p>
        </div>

        {/* EXCLUSIVITY BLOCK */}
        <div style={{
          background: "linear-gradient(135deg, #1c1400, #201800)",
          border: `2px solid ${C.yellow}`,
          borderRadius: "14px",
          padding: "24px 20px",
          marginBottom: "14px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Glow accent */}
          <div style={{ position: "absolute", top: 0, right: 0, width: "120px", height: "120px", background: `radial-gradient(circle, ${C.yellow}22 0%, transparent 70%)`, pointerEvents: "none" }} />

          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: `${C.yellow}20`, border: `1px solid ${C.yellow}60`, borderRadius: "20px", padding: "4px 12px", marginBottom: "14px" }}>
            <span style={{ fontSize: "12px" }}>🎯</span>
            <span style={{ fontSize: "10px", fontWeight: "800", color: C.yellow, letterSpacing: "0.1em", textTransform: "uppercase" }}>Solo 3 spots disponibles</span>
          </div>

          <h3 style={{ margin: "0 0 10px", fontSize: "20px", fontWeight: "900", color: C.white, lineHeight: 1.25 }}>
            Tu diagnóstico te <span style={{ color: C.yellow }}>calificó</span> para una<br />
            asesoría gratuita de 30 minutos
          </h3>

          <p style={{ margin: "0 0 18px", fontSize: "14px", color: C.grayLight, lineHeight: "1.7" }}>
            Basado en los resultados de tu negocio, has sido identificado como candidato para recibir una <strong style={{ color: C.white }}>Sesión de Diagnóstico Financiero</strong> sin costo — donde revisamos juntos tus números y definimos exactamente qué necesita tu negocio para ordenarse y crecer.
          </p>

          {/* What you get */}
          <div style={{ background: "#ffffff0a", borderRadius: "10px", padding: "14px 16px", marginBottom: "18px" }}>
            <p style={{ margin: "0 0 10px", fontSize: "11px", fontWeight: "800", color: C.yellow, textTransform: "uppercase", letterSpacing: "0.08em" }}>En esta sesión vamos a:</p>
            {[
              "Revisar los números más críticos de tu negocio",
              "Identificar las 2–3 áreas que más dinero te están costando",
              "Ver si somos el equipo correcto para trabajar juntos",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "10px", marginBottom: i < 2 ? "8px" : 0 }}>
                <span style={{ color: C.yellow, flexShrink: 0, fontSize: "13px" }}>✓</span>
                <p style={{ margin: 0, fontSize: "13px", color: C.grayLight, lineHeight: "1.5" }}>{item}</p>
              </div>
            ))}
          </div>

          {/* Not for everyone */}
          <div style={{ background: "#ff000008", border: `1px solid #ef444430`, borderRadius: "8px", padding: "12px 14px", marginBottom: "20px" }}>
            <p style={{ margin: "0 0 6px", fontSize: "11px", fontWeight: "800", color: C.red, textTransform: "uppercase", letterSpacing: "0.08em" }}>⚠️ Esto no es para todos</p>
            <p style={{ margin: 0, fontSize: "13px", color: C.gray, lineHeight: "1.6" }}>
              Esta asesoría es exclusiva para dueños que <strong style={{ color: C.grayLight }}>están dispuestos a tomar acción y corregir sus números</strong>. Si solo buscas información sin compromiso de mejorar, este espacio no es para ti.
            </p>
          </div>

          {/* CTA WhatsApp */}
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
            <div style={{
              background: "linear-gradient(135deg, #25D366, #1aab53)",
              borderRadius: "10px", padding: "16px 20px",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "12px",
              cursor: "pointer",
              boxShadow: "0 4px 24px #25D36640",
            }}>
              <span style={{ fontSize: "24px" }}>💬</span>
              <div>
                <div style={{ fontSize: "16px", fontWeight: "800", color: C.white, lineHeight: 1.2 }}>
                  Quiero aplicar a mi asesoría gratuita
                </div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.85)", marginTop: "3px" }}>
                  Hablar con Jorge por WhatsApp · Cupos limitados →
                </div>
              </div>
            </div>
          </a>

          <p style={{ margin: "12px 0 0", fontSize: "11px", color: C.gray, textAlign: "center" }}>
            🔒 Sin compromiso de compra · Solo para candidatos calificados
          </p>
        </div>

        <button onClick={handleReset} style={{ width: "100%", padding: "12px", borderRadius: "10px", border: `1px solid ${C.border}`, background: "transparent", color: C.gray, fontSize: "13px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit" }}>
          ← Hacer otro diagnóstico
        </button>

        <p style={{ textAlign: "center", fontSize: "11px", color: C.gray, marginTop: "16px", lineHeight: "1.6" }}>
          🔒 Tus datos son confidenciales · <strong style={{ color: C.orange }}>Tribu Finanzas en Acción</strong>
        </p>
      </div>
    </div>
  );
}

// ─── ADMIN PANEL ──────────────────────────────────────────
function AdminPanel({ onExit }) {
  const [pw, setPw] = useState("");
  const [auth, setAuth] = useState(false);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterRisk, setFilterRisk] = useState("TODOS");

  const login = () => {
    if (pw === "Plataforma25!") { setAuth(true); loadLeads(); }
    else setError("Contraseña incorrecta.");
  };

  const loadLeads = async () => {
    setLoading(true);
    try {
      const result = await window.storage.list("lead-", true);
      const keys = result?.keys || [];
      const items = await Promise.all(
        keys.map(async k => {
          try {
            const r = await window.storage.get(k, true);
            return r ? JSON.parse(r.value) : null;
          } catch { return null; }
        })
      );
      const sorted = items.filter(Boolean).sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      setLeads(sorted);
    } catch (e) {
      setError("Error cargando leads.");
    }
    setLoading(false);
  };

  const riesgoColor = r => r === "ALTO" ? C.red : r === "MEDIO" ? C.yellow : r === "BAJO" ? C.green : C.gray;

  const filtered = leads.filter(l => {
    const matchSearch = !search ||
      l.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      l.pais?.toLowerCase().includes(search.toLowerCase()) ||
      l.negocio?.toLowerCase().includes(search.toLowerCase()) ||
      l.whatsapp?.includes(search);
    const matchRisk = filterRisk === "TODOS" || l.riesgo === filterRisk;
    return matchSearch && matchRisk;
  });

  const fmt = fecha => {
    try {
      const d = new Date(fecha);
      return d.toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    } catch { return fecha; }
  };

  if (!auth) return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.white, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: "360px", padding: "24px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontSize: "32px", marginBottom: "8px" }}>🔐</div>
          <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "800" }}>Panel de Administrador</h2>
          <p style={{ margin: "6px 0 0", fontSize: "13px", color: C.gray }}>Tribu Finanzas en Acción</p>
        </div>
        <div style={{ marginBottom: "12px" }}>
          <input
            type="password" value={pw}
            onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === "Enter" && login()}
            placeholder="Contraseña"
            style={{ ...inputStyle, borderColor: error ? C.red : "#2D3149" }}
          />
        </div>
        {error && <p style={{ color: C.red, fontSize: "13px", margin: "0 0 12px" }}>{error}</p>}
        <button onClick={login} style={btnPrimary}>Entrar</button>
        <p style={{ textAlign: "center", marginTop: "16px" }}>
          <button onClick={onExit} style={{ background: "none", border: "none", color: C.gray, fontSize: "12px", cursor: "pointer", fontFamily: "inherit" }}>← Volver</button>
        </p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.white }}>
      {/* Admin Header */}
      <div style={{ background: "#1A1D2E", borderBottom: `1px solid ${C.border}`, padding: "14px 20px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
          <div>
            <div style={{ fontSize: "10px", fontWeight: "800", color: C.cyan, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2px" }}>Panel de Administrador</div>
            <div style={{ fontSize: "17px", fontWeight: "800" }}>📋 Base de Leads — CFO Virtual</div>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ background: "#232638", border: `1px solid ${C.border}`, borderRadius: "20px", padding: "5px 14px", fontSize: "12px", color: C.orange, fontWeight: "700" }}>
              {leads.length} lead{leads.length !== 1 ? "s" : ""} totales
            </div>
            <button onClick={loadLeads} style={{ padding: "6px 14px", borderRadius: "8px", border: `1px solid ${C.border}`, background: C.cardLight, color: C.gray, fontSize: "12px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" }}>
              🔄 Actualizar
            </button>
            <button onClick={onExit} style={{ padding: "6px 14px", borderRadius: "8px", border: `1px solid ${C.border}`, background: C.cardLight, color: C.gray, fontSize: "12px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" }}>
              ← Salir
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px 16px" }}>

        {/* Stats summary */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px", marginBottom: "20px" }}>
          {[
            { label: "Total leads", value: leads.length, color: C.cyan },
            { label: "Riesgo ALTO", value: leads.filter(l => l.riesgo === "ALTO").length, color: C.red },
            { label: "Riesgo MEDIO", value: leads.filter(l => l.riesgo === "MEDIO").length, color: C.yellow },
            { label: "Riesgo BAJO", value: leads.filter(l => l.riesgo === "BAJO").length, color: C.green },
          ].map((s, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: `3px solid ${s.color}`, borderRadius: "10px", padding: "14px", textAlign: "center" }}>
              <div style={{ fontSize: "28px", fontWeight: "900", color: s.color }}>{s.value}</div>
              <div style={{ fontSize: "11px", color: C.gray, marginTop: "4px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="🔍 Buscar por nombre, país, negocio o WhatsApp..."
            style={{ ...inputStyle, flex: "1", minWidth: "200px" }}
          />
          <div style={{ display: "flex", gap: "8px" }}>
            {["TODOS", "ALTO", "MEDIO", "BAJO"].map(r => (
              <button key={r} onClick={() => setFilterRisk(r)} style={{
                padding: "8px 14px", borderRadius: "8px", fontWeight: "700", fontSize: "12px",
                cursor: "pointer", border: "1px solid", fontFamily: "inherit",
                borderColor: filterRisk === r ? riesgoColor(r === "TODOS" ? null : r) : C.border,
                background: filterRisk === r ? `${riesgoColor(r === "TODOS" ? null : r)}20` : C.cardLight,
                color: filterRisk === r ? riesgoColor(r === "TODOS" ? null : r) : C.gray,
              }}>{r}</button>
            ))}
          </div>
        </div>

        {/* Leads table */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "48px", color: C.gray }}>Cargando leads...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px", background: C.card, borderRadius: "12px", border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>📭</div>
            <p style={{ color: C.gray, margin: 0 }}>{leads.length === 0 ? "Aún no hay leads registrados." : "No hay resultados para esa búsqueda."}</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {filtered.map((lead, i) => (
              <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `4px solid ${riesgoColor(lead.riesgo)}`, borderRadius: "10px", padding: "16px 18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px", marginBottom: "10px" }}>
                  <div>
                    <span style={{ fontSize: "16px", fontWeight: "800", color: C.white }}>{lead.nombre}</span>
                    <span style={{ marginLeft: "10px", fontSize: "12px", color: C.gray }}>{lead.pais}</span>
                  </div>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "10px", fontWeight: "800", padding: "3px 10px", borderRadius: "20px", background: `${riesgoColor(lead.riesgo)}20`, color: riesgoColor(lead.riesgo), border: `1px solid ${riesgoColor(lead.riesgo)}50` }}>
                      RIESGO {lead.riesgo}
                    </span>
                    <span style={{ fontSize: "11px", color: C.gray }}>{fmt(lead.fecha)}</span>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "8px" }}>
                  {[
                    { icon: "💬", label: "WhatsApp", value: lead.whatsapp },
                    { icon: "🏪", label: "Negocio", value: lead.negocio || "—" },
                    { icon: "💱", label: "Moneda", value: lead.moneda || "—" },
                    { icon: "💰", label: "Ventas/mes", value: lead.ventas ? `${lead.moneda || ""} ${Number(lead.ventas).toLocaleString()}` : "—" },
                    { icon: "🚨", label: "Alertas", value: `${lead.alertas || 0} detectada${lead.alertas !== 1 ? "s" : ""}` },
                    { icon: "🏦", label: "Finanzas sep.", value: lead.finanzasSeparadas === "si" ? "✅ Sí" : lead.finanzasSeparadas === "parcial" ? "⚠️ Parcial" : "❌ No" },
                  ].map((f, j) => (
                    <div key={j} style={{ background: C.cardLight, borderRadius: "8px", padding: "8px 12px" }}>
                      <div style={{ fontSize: "10px", color: C.gray, fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "3px" }}>{f.icon} {f.label}</div>
                      <div style={{ fontSize: "13px", color: C.grayLight, fontWeight: "600" }}>{f.value}</div>
                    </div>
                  ))}
                </div>
                {lead.problema && (
                  <div style={{ marginTop: "10px", background: "#ffffff08", borderRadius: "8px", padding: "8px 12px" }}>
                    <span style={{ fontSize: "10px", color: C.gray, fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em" }}>💬 Problema principal: </span>
                    <span style={{ fontSize: "13px", color: C.grayLight }}>{lead.problema}</span>
                  </div>
                )}
                {/* Quick WhatsApp button */}
                <div style={{ marginTop: "12px" }}>
                  <a
                    href={`https://wa.me/${lead.whatsapp?.replace(/[^0-9]/g, "")}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", background: "#25D36620", border: "1px solid #25D36650", borderRadius: "8px", padding: "6px 14px" }}
                  >
                    <span style={{ fontSize: "14px" }}>💬</span>
                    <span style={{ fontSize: "12px", fontWeight: "700", color: "#25D366" }}>Contactar por WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
