"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockConversations } from "@/lib/helpers/mock";

type Message = { id: string; from: "me" | "them"; text: string; ts: number };

export default function Page() {
  const qp = useSearchParams();
  const router = useRouter();
  const preselectId = qp.get("to") ?? undefined;
  const draftFromQp = qp.get("draft") ?? "";

  const [convs, setConvs] = React.useState(() =>
    mockConversations(10).map((c, i) => ({
      ...c,
      avatar: `https://i.pravatar.cc/80?u=${encodeURIComponent(c.id)}`,
      activeAt: Date.now() - i * 1000,
    }))
  );
  const [selectedId, setSelectedId] = React.useState(convs[0]?.id);
  const selected = convs.find((c) => c.id === selectedId)!;

  const [messages, setMessages] = React.useState<Record<string, Message[]>>(() => {
    const seed = (cid: string) =>
      Array.from({ length: 8 }, (_, i) => ({
        id: `${cid}-${i}`,
        from: i % 2 ? "me" as "me" : "them" as "them",
        text: i % 2 ? `Mình đã xem nhé (${i + 1})` : `Xin chào, rảnh không? (${i + 1})`,
        ts: Date.now() - (8 - i) * 60_000,
      }));
    return Object.fromEntries(convs.map((c) => [c.id, seed(c.id)]));
  });

  React.useEffect(() => {
    if (!preselectId) return;
    const found = convs.find((c) => c.id === preselectId);
    if (found) setSelectedId(found.id);
    if (draftFromQp) setDraft(draftFromQp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preselectId, draftFromQp]);

  const [typing, setTyping] = React.useState(false);

  React.useEffect(() => {
    const replies = ["Ok bạn nhé!", "Đang tới nè.", "Để mình check lại.", "Chuẩn rồi 👍", "Tối gặp nhé.", "Call mình khi vào phòng."];
    const t = setInterval(() => {
      if (!selectedId) return;
      setTyping(true);
      const text = replies[Math.floor(Math.random() * replies.length)];
      setTimeout(() => {
        setMessages((prev) => {
          const arr = (prev[selectedId] ?? []).slice();
          arr.push({ id: crypto.randomUUID(), from: "them", text, ts: Date.now() });
          return { ...prev, [selectedId]: arr };
        });
        setConvs((prev) => {
          const idx = prev.findIndex((c) => c.id === selectedId);
          if (idx === -1) return prev;
          const updated = { ...prev[idx], lastMessage: text, activeAt: Date.now() };
          const next = prev.slice();
          next.splice(idx, 1);
          next.unshift(updated);
          return next;
        });
        setTyping(false);
      }, 800);
    }, 7000);
    return () => clearInterval(t);
  }, [selectedId]);

  const endRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [selectedId, messages[selectedId]?.length, typing]);

  const [draft, setDraft] = React.useState("");
  function send() {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => {
      const arr = (prev[selectedId] ?? []).slice();
      arr.push({ id: crypto.randomUUID(), from: "me", text, ts: Date.now() });
      return { ...prev, [selectedId]: arr };
    });
    setConvs((prev) => {
      const idx = prev.findIndex((c) => c.id === selectedId);
      if (idx === -1) return prev;
      const updated = { ...prev[idx], lastMessage: text, activeAt: Date.now() };
      const next = prev.slice();
      next.splice(idx, 1);
      next.unshift(updated);
      return next;
    });
    setDraft("");
  }

  const fmtTime = (t: number) =>
    new Date(t).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    // CHỐT CHIỀU CAO & ẨN SCROLL TRANG, CHỈ CHO KHUNG CON CUỘN
    <div className="grid h-[calc(100dvh-140px)] grid-cols-1 gap-4 overflow-hidden md:grid-cols-[320px_1fr]">
      {/* Sidebar */}
      <aside className="flex min-h-0 flex-col space-y-3 overflow-hidden">
        <div className="flex items-center gap-2">
          <Input placeholder="Tìm cuộc trò chuyện…" />
          <Button variant="outline">Tìm</Button>
        </div>

        <Card className="grid flex-1 grid-rows-[auto_minmax(0,1fr)] overflow-hidden">
          <div className="border-b px-3 py-2 text-sm font-semibold">Hộp thoại</div>
          <div className="min-h-0 overflow-y-auto">
            {convs
              .slice()
              .sort((a, b) => b.activeAt - a.activeAt)
              .map((c) => {
                const active = c.id === selectedId;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedId(c.id)}
                    className={`flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-accent ${active ? "bg-accent" : ""}`}
                  >
                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-muted">
                      <img src={c.avatar} alt={c.name} className="h-full w-full object-cover" loading="lazy" />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{c.name}</div>
                      <div className="truncate text-xs text-muted-foreground">{c.lastMessage}</div>
                    </div>
                    <div className="ml-auto pl-2 text-[10px] text-muted-foreground">{fmtTime(c.activeAt)}</div>
                  </button>
                );
              })}
          </div>
        </Card>
      </aside>

      {/* Chat panel */}
      <Card className="grid h-full grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 border-b p-3">
          <button
            onClick={() => router.push(`/profile/${selected.id}`)}
            className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-muted transition-opacity hover:opacity-80"
          >
            <img
              src={`https://i.pravatar.cc/80?u=${encodeURIComponent(selected.id)}`}
              alt={selected.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </button>
          <button
            onClick={() => router.push(`/profile/${selected.id}`)}
            className="min-w-0 text-left transition-opacity hover:opacity-80"
          >
            <div className="truncate font-medium">{selected.name}</div>
            <div className="text-xs text-muted-foreground">Đang hoạt động • demo</div>
          </button>
        </div>

        {/* Messages — CHỈ KHUNG NÀY CUỘN */}
        <div className="min-h-0 overflow-y-auto bg-[hsl(var(--muted))] p-4">
          <div className="mb-3 flex items-center gap-3 text-center text-[11px] text-muted-foreground">
            <span className="h-px flex-1 bg-[hsl(var(--border))]" />
            Hôm nay
            <span className="h-px flex-1 bg-[hsl(var(--border))]" />
          </div>

          <div className="space-y-2">
            {(messages[selectedId] ?? []).map((m) => {
              const mine = m.from === "me";
              return (
                <div key={m.id} className={`flex items-end gap-2 ${mine ? "justify-end" : "justify-start"}`}>
                  {!mine && (
                    <div className="h-7 w-7 shrink-0 overflow-hidden rounded-full bg-muted">
                      <img
                        src={`https://i.pravatar.cc/40?u=${encodeURIComponent(selected.id)}`}
                        alt={selected.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div
                    className={`max-w-[72%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                      mine ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-background rounded-bl-sm"
                    }`}
                    title={new Date(m.ts).toLocaleString()}
                  >
                    {m.text}
                    <div className={`mt-1 text-[10px] opacity-70 ${mine ? "text-white" : "text-foreground/70"}`}>{fmtTime(m.ts)}</div>
                  </div>
                </div>
              );
            })}

            {typing && (
              <div className="flex items-end gap-2">
                <div className="h-7 w-7 shrink-0 overflow-hidden rounded-full bg-muted" />
                <div className="rounded-2xl bg-background px-3 py-2 text-sm shadow-sm">
                  <span className="inline-flex items-center gap-1">
                    <i className="inline-block h-1 w-1 animate-bounce rounded-full bg-foreground/60 [animation-delay:-.2s]" />
                    <i className="inline-block h-1 w-1 animate-bounce rounded-full bg-foreground/60" />
                    <i className="inline-block h-1 w-1 animate-bounce rounded-full bg-foreground/60 [animation-delay:.2s]" />
                  </span>
                </div>
              </div>
            )}
          </div>
          <div ref={endRef} />
        </div>

        {/* Composer */}
        <form
          className="flex gap-2 border-t p-2"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={`Nhắn cho ${selected.name}…`} />
          <Button type="submit">Gửi</Button>
        </form>
      </Card>
    </div>
  );
}
