'use client'

import { CameraKitSession, Lens } from '@snap/camera-kit';
import { createContext, useEffect, useRef, useState } from 'react';

const apiToken = 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzY4NzIzOTk3LCJzdWIiOiJlN2RhNWJhYS01YzZhLTRkYmEtOGIzNi03ODk0MTc0ZTRjOGZ-U1RBR0lOR35mODI1NWY3Yy1hZmE4LTRmMzItYWE1NS02YWZiYzM2NTViMTEifQ.-NehzU1Jza9H6XKjOi3HRXzwj-yUhaSKxLmfpbAVonY';
const lensGroupId = '528041a9-aa36-47ea-bc71-76198f3ee514';

export interface CameraKitState {
  session: CameraKitSession;
  lenses: Lens[];
}

export const CameraKitContext = createContext<CameraKitState | null>(null);

export const CameraKit: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log("in the camera kit");
  const [session, setSession] = useState<CameraKitSession | null>(null);
  const [lenses, setLenses] = useState<Lens[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const init = async () => {
      try {
        const { bootstrapCameraKit } = await import('@snap/camera-kit');
        const cameraKit = await bootstrapCameraKit({ apiToken });

        const session = await cameraKit.createSession({
          liveRenderTarget: canvasRef.current || undefined
        });
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        await session.setSource(stream);

        console.log("after setSource , before play");
        await session.play();

        const { lenses } = await cameraKit.lensRepository.loadLensGroups([lensGroupId]);

        // const lens = await cameraKit.lensRepository.loadLens(
        //   '2051a49d-1848-4c33-9734-65450de02c11',
        //   '528041a9-aa36-47ea-bc71-76198f3ee514'
        // );
        // console.log("found lens: ", lens);

        setLenses(lenses);
        setSession(session);
      } catch (err) {
        console.error("CameraKit init failed:", err);
      }
    };

    init();

    return () => {
      session?.destroy();
    };
  }, []);

  return (
    <CameraKitContext.Provider value={session ? { session, lenses } : null}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {/* We keep the canvas here so the Ref is always available to the session */}
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", display: session ? "block" : "none" }}
        />
        {!session ? <div>Initializing Camera Kit...</div> : children}
      </div>
    </CameraKitContext.Provider>
  );
};