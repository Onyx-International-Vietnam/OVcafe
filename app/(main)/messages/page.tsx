"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockConversations } from "@/lib/helpers/mock";
import { Send, Search, Phone, Video, MoreVertical, ArrowLeft, Paperclip, Smile } from "lucide-react";

type Message = { id: string; from: "me" | "them"; text: string; ts: number };

function MessagesPage() {
  const qp = useSearchParams();
  const router = useRouter();
  const preselectId = qp.get("to") ?? undefined;
  const draftFromQp = qp.get("draft") ?? "";

  const [convs, setConvs] = React.useState(() =>
    mockConversations(10).map((c, i) => ({
      ...c,
      avatar: `https://i.pravatar.cc/80?u=${encodeURIComponent(c.id)}`,
      activeAt: Date.now() - i * 1000,
      unread: i % 3 === 0 ? Math.floor(Math.random() * 5) + 1 : 0,
      online: i % 2 === 0,
    }))
  );
  const [selectedId, setSelectedId] = React.useState(convs[0]?.id);
  const [showSidebar, setShowSidebar] = React.useState(true);
  const selected = convs.find((c) => c.id === selectedId)!;

  const [messages, setMessages] = React.useState<Record<string, Message[]>>(() => {
    const seed = (cid: string) =>
      Array.from({ length: 8 }, (_, i) => ({
        id: `${cid}-${i}`,
        from: i % 2 ? ("me" as const) : ("them" as const),
        text: i % 2 ? `Mình đã xem nhé (${i + 1})` : `Xin chào, rảnh không? (${i + 1})`,
        ts: Date.now() - (8 - i) * 60_000,
      }));
    return Object.fromEntries(convs.map((c) => [c.id, seed(c.id)]));
  });

  React.useEffect(() => {
    if (!preselectId) return;
    const found = convs.find((c) => c.id === preselectId);
    if (found) {
      setSelectedId(found.id);
      setShowSidebar(false);
    }
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
  const currentMessagesLength = messages[selectedId]?.length;
  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [selectedId, currentMessagesLength, typing]);

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
      const updated = { ...prev[idx], lastMessage: text, activeAt: Date.now(), unread: 0 };
      const next = prev.slice();
      next.splice(idx, 1);
      next.unshift(updated);
      return next;
    });
    setDraft("");
  }

  const fmtTime = (t: number) => {
    const now = Date.now();
    const diff = now - t;
    if (diff < 60_000) return "Vừa xong";
    if (diff < 3600_000) return `${Math.floor(diff / 60_000)} phút`;
    if (diff < 86400_000) return new Date(t).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return new Date(t).toLocaleDateString([], { day: "2-digit", month: "2-digit" });
  };

  return (
    <div className="grid h-[calc(100dvh-140px)] grid-cols-1 gap-0 overflow-hidden lg:grid-cols-[360px_1fr] lg:gap-4">
      {/* Sidebar - Hidden on mobile when chat is selected */}
      <aside className={`flex min-h-0 flex-col space-y-3 overflow-hidden transition-all duration-300 ${!showSidebar ? "hidden lg:flex" : "flex"}`}>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Tìm kiếm..." className="pl-9" />
          </div>
          <Button variant="outline" size="icon" className="shrink-0">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <Card className="grid flex-1 grid-rows-[auto_minmax(0,1fr)] overflow-hidden shadow-lg">
          <div className="border-b bg-muted/30 px-4 py-3">
            <h2 className="text-sm font-semibold">Tin nhắn</h2>
          </div>
          <div className="min-h-0 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted">
            {convs
              .slice()
              .sort((a, b) => b.activeAt - a.activeAt)
              .map((c) => {
                const active = c.id === selectedId;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedId(c.id);
                      setShowSidebar(false);
                    }}
                    className={`group relative flex w-full items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:bg-accent/50 ${
                      active ? "bg-accent/70" : ""
                    }`}
                  >
                    <div className="relative h-12 w-12 shrink-0">
                      <div className="h-full w-full overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-primary/5 ring-2 ring-background transition-transform group-hover:scale-105">
                        <Image src={c.avatar} alt={c.name} className="h-full w-full object-cover" width={80} height={80} loading="lazy" />
                      </div>
                      {c.online && (
                        <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-background bg-green-500 z-10" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="truncate text-sm font-semibold">{c.name}</div>
                        <div className="text-[11px] text-muted-foreground">{fmtTime(c.activeAt)}</div>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="truncate text-xs text-muted-foreground">{c.lastMessage}</div>
                        {c.unread > 0 && (
                          <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
                            {c.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
          </div>
        </Card>
      </aside>

      {/* Chat panel - Full width on mobile */}
      <Card className={`grid h-full grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden shadow-lg transition-all duration-300 ${showSidebar ? "hidden lg:grid" : "grid"}`}>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b bg-card/50 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setShowSidebar(true)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <button
              title={`View profile of ${selected.name}`}
              onClick={() => router.push(`/profile/${selected.id}`)}
              className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-primary/5 ring-2 ring-background transition-all hover:scale-105"
            >
              <Image
                src={`https://i.pravatar.cc/80?u=${encodeURIComponent(selected.id)}`}
                alt={selected.name}
                className="h-full w-full object-cover"
                width={80}
                height={80}
                loading="lazy"
              />
              {selected.online && (
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500 z-10" />
              )}
            </button>
            <button
              onClick={() => router.push(`/profile/${selected.id}`)}
              className="min-w-0 text-left transition-opacity hover:opacity-80"
            >
              <div className="truncate font-semibold">{selected.name}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className={`h-1.5 w-1.5 rounded-full ${selected.online ? "bg-green-500" : "bg-gray-400"}`} />
                {selected.online ? "Đang hoạt động" : "Không hoạt động"}
              </div>
            </button>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="min-h-0 overflow-y-auto bg-gradient-to-b from-muted/30 to-muted/10 p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted lg:p-6">
          <div className="mb-4 flex items-center gap-3 text-center">
            <span className="h-px flex-1 bg-border/50" />
            <span className="rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              Hôm nay
            </span>
            <span className="h-px flex-1 bg-border/50" />
          </div>

          <div className="space-y-3">
            {(messages[selectedId] ?? []).map((m, idx) => {
              const mine = m.from === "me";
              const showAvatar = !mine && (idx === 0 || messages[selectedId][idx - 1]?.from !== "them");
              return (
                <div key={m.id} className={`flex items-end gap-2 ${mine ? "justify-end" : "justify-start"}`}>
                  {!mine && (
                    <div className="h-7 w-7 shrink-0">
                      {showAvatar ? (
                        <div className="h-full w-full overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-primary/5">
                          <Image
                            src={`https://i.pravatar.cc/40?u=${encodeURIComponent(selected.id)}`}
                            alt={selected.name}
                            className="h-full w-full object-cover"
                            width={40}
                            height={40}
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>
                  )}
                  <div
                    className={`group relative max-w-[85%] break-words rounded-2xl px-4 py-2.5 text-sm shadow-md transition-all hover:shadow-lg sm:max-w-[75%] lg:max-w-[65%] ${
                      mine
                        ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-br-md"
                        : "bg-background rounded-bl-md"
                    }`}
                    title={new Date(m.ts).toLocaleString()}
                  >
                    <div className="leading-relaxed">{m.text}</div>
                    <div className={`mt-1 text-[10px] ${mine ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      {fmtTime(m.ts)}
                    </div>
                  </div>
                </div>
              );
            })}

            {typing && (
              <div className="flex items-end gap-2 animate-in fade-in slide-in-from-left-2">
                <div className="h-7 w-7 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-primary/5">
                  <Image
                    src={`https://i.pravatar.cc/40?u=${encodeURIComponent(selected.id)}`}
                    alt={selected.name}
                    className="h-full w-full object-cover"
                    width={40}
                    height={40}
                    loading="lazy"
                  />
                </div>
                <div className="rounded-2xl rounded-bl-md bg-background px-4 py-3 shadow-md">
                  <span className="inline-flex items-center gap-1">
                    <i className="inline-block h-2 w-2 animate-bounce rounded-full bg-foreground/60 [animation-delay:-.2s]" />
                    <i className="inline-block h-2 w-2 animate-bounce rounded-full bg-foreground/60" />
                    <i className="inline-block h-2 w-2 animate-bounce rounded-full bg-foreground/60 [animation-delay:.2s]" />
                  </span>
                </div>
              </div>
            )}
          </div>
          <div ref={endRef} />
        </div>

        {/* Composer */}
        <form
          className="flex items-end gap-2 border-t bg-card/50 p-3 backdrop-blur-sm lg:p-4"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <Button type="button" variant="ghost" size="icon" className="mb-1 hidden h-9 w-9 shrink-0 sm:flex">
            <Paperclip className="h-4 w-4" />
          </Button>
          <div className="relative flex-1">
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={`Nhắn tin cho ${selected.name}...`}
              className="min-h-[44px] resize-none rounded-full border-2 pr-12 focus-visible:ring-2"
            />
            <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2">
              <Smile className="h-4 w-4" />
            </Button>
          </div>
          <Button type="submit" size="icon" className="mb-1 h-11 w-11 shrink-0 rounded-full shadow-lg transition-all hover:scale-105" disabled={!draft.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default function Page() {
  return (
    <React.Suspense fallback={<div className="flex h-[calc(100dvh-140px)] items-center justify-center">Đang tải...</div>}>
      <MessagesPage />
    </React.Suspense>
  );
}
