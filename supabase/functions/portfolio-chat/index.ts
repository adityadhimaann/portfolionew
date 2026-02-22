import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are an AI assistant for Aditya Kumar's portfolio website. You're knowledgeable, professional, and enthusiastic about Aditya's work. Keep responses concise (2-4 sentences max unless the user asks for detail).

About Aditya Kumar:
- Full Stack Developer & B.Tech CSE student at Lovely Professional University (CGPA: 7.34)
- Languages: Java, C++, JavaScript, Python, PHP
- Web Technologies: React.js, Node.js, Express.js, Spring Boot, HTML5, CSS3, TailwindCSS, TypeScript
- Databases: MySQL, PostgreSQL, MongoDB
- Cloud & DevOps: Oracle Cloud (OCI Certified), Google Cloud Platform (GCP), Docker, Vercel, Render, Railway
- Tools: Git/GitHub, Postman, Socket.IO, WebRTC, RESTful APIs
- Core Competencies: Data Structures & Algorithms, System Design, Generative AI
- Location: Punjab, India (available for remote work worldwide)
- Email: dhimanaditya56@gmail.com
- Phone: +91-6306580926
- Portfolio: https://www.adidev.works
- GitHub: https://github.com/adityadhimaann
- LinkedIn: https://www.linkedin.com/in/adityadhimaann
- Availability: Currently available for new projects and freelance work

Experience:
1. Upwork Freelancer (Dec 2025 - Present): Delivering web app development, UI/UX design, and full-stack solutions. Managing complete SDLC for EdTech platforms, dashboards, and interactive web apps.
2. Larsen & Toubro - Web Application Developer (Jun 2025 - Jul 2025): Designed Campus Gateway for 500+ employees with 99.9% uptime. Achieved 65% latency reduction (3.2s to 1.1s). Deployed on IIS/Hyper-V.

Featured Projects:
1. BusGuard - GenAI-powered bus travel assistant with real-time delay prediction and last-mile planning. Stack: MERN + GenAI.
2. UniEd - Unified Education Platform with live streaming via WebRTC, AI assessment tutor, generated ₹25,000+ revenue. Stack: React, TypeScript, Node.js, Socket.IO, WebRTC, GenAI.
3. WeChat - Real-time chat app with Discover and Share Memories features. Stack: React Native, Node.js, MongoDB.
4. BhasaVitt - Multilingual AI for financial literacy (Top 15 in 25,000+ at Gromo-AWS-Sarvam AI Challenge). Stack: Python, AWS, Sarvam AI, NLP.
5. Campus Gateway - Enterprise campus management at L&T for 500+ employees, 99.9% uptime.

Certifications:
- Oracle Cloud Infrastructure 2025 Certified
- Getting Started with MongoDB Atlas
- Introduction to Generative AI (Google)
- Responsive Web Design (FreeCodeCamp)

Achievements:
- Top 15 among 25,000+ in Gromo-AWS-Sarvam AI Challenge
- Smart India Hackathon 2025 Nominee (Government of Punjab)
- IIT Guwahati Summer Analytics participant
- LeetCode DSA practice

Services:
- Full Stack Web Development: MERN stack, Spring Boot, end-to-end development
- UI/UX & Frontend: Responsive interfaces with React, TypeScript, TailwindCSS
- GenAI Integration: AI-powered chatbots, assessment tools, RAG-based systems
- Cloud & DevOps: Deployment on OCI, GCP, Docker, Vercel, Railway

When asked to "show" a project, describe it vividly. Be conversational and personable. If asked about booking a call, direct them to the contact section or email dhimanaditya56@gmail.com.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not configured");
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit reached. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits depleted. Please contact the site owner." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(
        JSON.stringify({ error: "AI service temporarily unavailable." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
