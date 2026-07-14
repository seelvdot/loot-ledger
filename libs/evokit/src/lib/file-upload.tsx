'use client';

import * as React from 'react';
import { useState, useRef } from 'react';
import { Upload, X, ImageIcon, Film, Music, File } from 'lucide-react';
import { cn } from './utils';

const FONT_HEADER = 'var(--font-header)';
const FONT_MONO = 'var(--font-mono)';

const FILE_ICONS: Record<string, React.ReactNode> = {
  image: <ImageIcon size={14} className="text-sky-400" />,
  video: <Film size={14} className="text-violet-400" />,
  audio: <Music size={14} className="text-amber-400" />,
  default: <File size={14} className="text-muted-foreground" />,
};

function getFileType(name: string) {
  const ext = name.split('.').pop()?.toLowerCase() ?? '';
  if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext))
    return 'image';
  if (['mp4', 'mov', 'webm'].includes(ext)) return 'video';
  if (['mp3', 'wav', 'ogg'].includes(ext)) return 'audio';
  return 'default';
}

export interface FileUploadZoneProps {
  files?: { name: string; size: string; data?: string }[];
  onChange?: (files: { name: string; size: string; data?: string }[]) => void;
  disabled?: boolean;
}

export function FileUploadZone({
  files: propFiles,
  onChange,
  disabled = false,
}: FileUploadZoneProps) {
  const [dragging, setDragging] = useState(false);
  const [localFiles, setLocalFiles] = useState<
    { name: string; size: string; data?: string }[]
  >([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = propFiles !== undefined;
  const files = isControlled ? propFiles : localFiles;

  const addFiles = (incoming: FileList | null) => {
    if (!incoming || disabled) return;

    const promises = Array.from(incoming).map((f) => {
      return new Promise<{ name: string; size: string; data?: string }>(
        (resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result as string;
            const sizeStr =
              f.size < 1024
                ? `${f.size} B`
                : f.size < 1024 * 1024
                  ? `${(f.size / 1024).toFixed(1)} KB`
                  : `${(f.size / (1024 * 1024)).toFixed(1)} MB`;
            resolve({
              name: f.name,
              size: sizeStr,
              data: base64String,
            });
          };
          reader.readAsDataURL(f);
        },
      );
    });

    Promise.all(promises).then((newFiles) => {
      if (isControlled) {
        if (onChange) onChange([...files, ...newFiles]);
      } else {
        setLocalFiles((prev) => [...prev, ...newFiles]);
      }
    });
  };

  const removeFile = (index: number) => {
    if (disabled) return;
    if (isControlled) {
      if (onChange) onChange(files.filter((_, i) => i !== index));
    } else {
      setLocalFiles((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-3">
      {!disabled && (
        <div
          onDragOver={(e) => {
            if (disabled) return;
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            if (disabled) return;
            e.preventDefault();
            setDragging(false);
            addFiles(e.dataTransfer.files);
          }}
          onClick={() => {
            if (disabled) return;
            inputRef.current?.click();
          }}
          className={cn(
            'border border-dashed p-6 flex flex-col items-center gap-2 cursor-pointer transition-colors',
            dragging
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/40 hover:bg-secondary/30',
            disabled && 'opacity-50 pointer-events-none cursor-not-allowed',
          )}
        >
          <Upload
            size={18}
            className={cn(
              'transition-colors',
              dragging ? 'text-primary' : 'text-muted-foreground/50',
            )}
          />
          <div className="text-center">
            <p
              className="text-xs font-bold uppercase tracking-widest text-foreground font-space-grotesk"
              style={{ fontFamily: FONT_HEADER }}
            >
              {dragging ? 'Solte para enviar' : 'Arraste arquivos aqui'}
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              ou clique para procurar — Imagens, PDFs, Documentos
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            multiple
            className="hidden"
            disabled={disabled}
            onChange={(e) => addFiles(e.target.files)}
          />
        </div>
      )}

      {files.length > 0 && (
        <div className="border border-border divide-y divide-border">
          {files.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-2 hover:bg-secondary/20 transition-colors"
            >
              {FILE_ICONS[getFileType(f.name)] || FILE_ICONS.default}
              {f.data ? (
                <a
                  href={
                    f.data.startsWith('http') || f.data.startsWith('data:')
                      ? f.data
                      : (() => {
                          const apiHost = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3001';
                          const normalizedPath = f.data.startsWith('/uploads/')
                            ? `/api${f.data}`
                            : f.data;
                          return `${apiHost}${normalizedPath}`;
                        })()
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  download={f.name}
                  className="flex-1 text-xs text-foreground truncate hover:underline hover:text-primary transition-colors cursor-pointer"
                  title="Clique para baixar"
                >
                  {f.name}
                </a>
              ) : (
                <span className="flex-1 text-xs text-foreground truncate">
                  {f.name}
                </span>
              )}
              <span
                className="text-[9px] text-muted-foreground shrink-0 font-mono"
                style={{ fontFamily: FONT_MONO }}
              >
                {f.size}
              </span>
              {!disabled && (
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="text-muted-foreground hover:text-rose-400 transition-colors cursor-pointer"
                >
                  <X size={11} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
