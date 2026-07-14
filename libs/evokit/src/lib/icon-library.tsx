'use client';

import * as React from "react";
import {
  Check, X, AlertCircle, Info, AlertTriangle, CheckCircle2,
  Copy, Eye, Search, ArrowUpRight, Zap, Shield, Layers, Star,
  Bell, Settings, Wifi, WifiOff, Cpu, Activity, Upload, Download,
  Trash2, RefreshCw, Lock, Unlock, Hash, Globe, Code2, Terminal,
  Package, CreditCard, TrendingUp, TrendingDown, Clock, Calendar,
  MessageSquare, Send, MoreHorizontal, Plus
} from "lucide-react";

const FONT_MONO = "var(--font-mono)";

export const DS_ICONS = [
  { icon: <Check size={17} />, name: "Check" },
  { icon: <X size={17} />, name: "X" },
  { icon: <AlertCircle size={17} />, name: "AlertCircle" },
  { icon: <Info size={17} />, name: "Info" },
  { icon: <AlertTriangle size={17} />, name: "AlertTriangle" },
  { icon: <CheckCircle2 size={17} />, name: "CheckCircle2" },
  { icon: <Copy size={17} />, name: "Copy" },
  { icon: <Eye size={17} />, name: "Eye" },
  { icon: <Search size={17} />, name: "Search" },
  { icon: <ArrowUpRight size={17} />, name: "ArrowUpRight" },
  { icon: <Zap size={17} />, name: "Zap" },
  { icon: <Shield size={17} />, name: "Shield" },
  { icon: <Layers size={17} />, name: "Layers" },
  { icon: <Star size={17} />, name: "Star" },
  { icon: <Bell size={17} />, name: "Bell" },
  { icon: <Settings size={17} />, name: "Settings" },
  { icon: <Wifi size={17} />, name: "Wifi" },
  { icon: <WifiOff size={17} />, name: "WifiOff" },
  { icon: <Cpu size={17} />, name: "Cpu" },
  { icon: <Activity size={17} />, name: "Activity" },
  { icon: <Upload size={17} />, name: "Upload" },
  { icon: <Download size={17} />, name: "Download" },
  { icon: <Trash2 size={17} />, name: "Trash2" },
  { icon: <RefreshCw size={17} />, name: "RefreshCw" },
  { icon: <Lock size={17} />, name: "Lock" },
  { icon: <Unlock size={17} />, name: "Unlock" },
  { icon: <Hash size={17} />, name: "Hash" },
  { icon: <Globe size={17} />, name: "Globe" },
  { icon: <Code2 size={17} />, name: "Code2" },
  { icon: <Terminal size={17} />, name: "Terminal" },
  { icon: <Package size={17} />, name: "Package" },
  { icon: <CreditCard size={17} />, name: "CreditCard" },
  { icon: <TrendingUp size={17} />, name: "TrendingUp" },
  { icon: <TrendingDown size={17} />, name: "TrendingDown" },
  { icon: <Clock size={17} />, name: "Clock" },
  { icon: <Calendar size={17} />, name: "Calendar" },
  { icon: <MessageSquare size={17} />, name: "MessageSquare" },
  { icon: <Send size={17} />, name: "Send" },
  { icon: <MoreHorizontal size={17} />, name: "MoreHoriz" },
  { icon: <Plus size={17} />, name: "Plus" },
];

export function IconLibrary() {
  return (
    <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
      {DS_ICONS.map(({ icon, name }) => (
        <div
          key={name}
          title={name}
          className="flex flex-col items-center gap-1.5 border border-border p-2.5 hover:border-primary/40 hover:bg-secondary/40 transition-colors cursor-default group"
        >
          <span className="text-muted-foreground group-hover:text-primary transition-colors">{icon}</span>
          <span className="text-[7px] text-muted-foreground text-center leading-tight hidden sm:block" style={{ fontFamily: FONT_MONO }}>{name}</span>
        </div>
      ))}
    </div>
  );
}
