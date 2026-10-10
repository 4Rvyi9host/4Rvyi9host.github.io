"use client";

import Image from "next/image";
import { useState } from "react";
import { profile } from "@/data/portfolio";

type ProfilePhotoProps = { className?: string; sizes?: string; priority?: boolean };

export function ProfilePhoto({ className = "", sizes = "(max-width: 768px) 34vw, 220px", priority = false }: ProfilePhotoProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`profile-photo ${className}`}>
      {!failed ? (
        <Image
          src={profile.avatar}
          alt={`Foto profil ${profile.name}`}
          fill
          sizes={sizes}
          unoptimized
          preload={priority}
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="profile-photo-fallback" aria-label={`Inisial ${profile.shortName}`}>
          RA<span>.</span>
        </span>
      )}
    </div>
  );
}
