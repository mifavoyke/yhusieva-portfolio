'use client'

import { useEffect } from "react";
import { useCameraKit } from "../useCamera";

interface LensControllerProps {
  lensId: string;
}

export const LensController: React.FC<LensControllerProps> = ({ lensId }) => {
  const { session, lenses } = useCameraKit();

  useEffect(() => {
    console.log("in the component");
    if (!session) {
      console.log("session dont exist");
      return;
    }
    if (!lenses.length) {
      console.log("lenses dont exist");
      return;
    }
    const applyNewLens = async () => {
      const lens = lenses.find(l => l.id === lensId);

      if (lens) {
        console.log("Applying Lens:", lens.name);
        const success = await session.applyLens(lens);

        if (success) {
          console.log("Lens applied successfully!");
        } else {
          console.error("Engine rejected the lens. Check your API Token or Group ID.");
        }
      } else {
        console.error("Lens ID not found in group:", lensId);
      }
    };

    applyNewLens();
  }, [lensId, session, lenses]);

  return null;
};