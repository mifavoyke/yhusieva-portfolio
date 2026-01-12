'use client'

import React, { useEffect, useRef } from "react";
import type { CameraKitSession, Lens as CameraLens } from '@snap/camera-kit';

type BootstrapFn = typeof import('@snap/camera-kit')['bootstrapCameraKit'];
type CameraKitApi = Awaited<ReturnType<BootstrapFn>>;

interface LensProps {
  apiToken: string;
  lensId: string;
  lensGroupId?: string;
}

const Lens: React.FC<LensProps> = ({ apiToken, lensId, lensGroupId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sessionRef = useRef<CameraKitSession | null>(null);
  const cameraKitRef = useRef<CameraKitApi | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    let mounted = true;

    // Initialize Camera Kit once, then re-apply lenses when props change.
    const ensureSession = async () => {
      if (isInitialized.current) return;
      if (!canvasRef.current) return;

      // Wait a tick to ensure the canvas is in the DOM and sized before it is transferred.
      await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
      if (!canvasRef.current?.isConnected) return;

      isInitialized.current = true;

      const { bootstrapCameraKit } = await import('@snap/camera-kit');

      const cameraKit = await bootstrapCameraKit({ apiToken });
      cameraKitRef.current = cameraKit;

      const session = await cameraKit.createSession({
        liveRenderTarget: canvasRef.current,
      });

      sessionRef.current = session;

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      streamRef.current = mediaStream;
      await session.setSource(mediaStream);
      await session.play();
    };

    const applyLens = async () => {
      await ensureSession();
      if (!mounted) return;
      if (!cameraKitRef.current || !sessionRef.current) return;

      try {
        const lens: CameraLens = lensGroupId
          ? await cameraKitRef.current.lensRepository.loadLens(lensId, lensGroupId)
          : await cameraKitRef.current.lensRepository.loadLens(lensId, "");

        if (!mounted) return;
        await sessionRef.current.applyLens(lens);
      } catch (error) {
        console.error('Applying lens failed:', error);
      }
    };

    applyLens();

    return () => {
      mounted = false;
      if (sessionRef.current) {
        // Gracefully stop the session to avoid reusing an offscreen canvas.
        sessionRef.current.pause?.();
        // Some builds expose dispose/close; guard both.
        // @ts-expect-error: dispose/close may not exist in types.
        sessionRef.current.dispose?.();
        // @ts-expect-error: dispose/close may not exist in types.
        sessionRef.current.close?.();
      }
      sessionRef.current = null;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      cameraKitRef.current = null;
      isInitialized.current = false;
    };
  }, [apiToken, lensId, lensGroupId]);

  return (
    <div
      style={{
        // width: "360px",
        // height: "480px",
        borderRadius: "16px",
        overflow: "hidden",
        background: "#000",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
};

export default Lens;
