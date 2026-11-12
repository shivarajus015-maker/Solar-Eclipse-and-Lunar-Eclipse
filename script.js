(() => {
  "use strict";

  // =========================================================================
  // 1. ASTRONOMICAL CONSTANTS & PRESETS
  // =========================================================================
  const ASTRO = {
    SUN_RADIUS_KM: 696340,
    EARTH_RADIUS_KM: 6371,
    MOON_RADIUS_KM: 1737.4,
    SUN_EARTH_DIST_KM: 149597870,
    MIN_MOON_DIST_KM: 356500,
    MAX_MOON_DIST_KM: 406700,
    RAD_TO_ARCMIN: (180 * 60) / Math.PI,
    DEG_TO_RAD: Math.PI / 180
  };

  const PRESETS = {
    "solar-total": { category: "solar", moonDistKm: 360000, tiltDeg: 0, progress: 50 },
    "solar-annular": { category: "solar", moonDistKm: 404500, tiltDeg: 0, progress: 50 },
    "solar-partial": { category: "solar", moonDistKm: 372000, tiltDeg: 0.30, progress: 50 },
    "lunar-total": { category: "lunar", moonDistKm: 378000, tiltDeg: 0, progress: 50 },
    "lunar-partial": { category: "lunar", moonDistKm: 384400, tiltDeg: 0.62, progress: 50 },
    "lunar-penumbral": { category: "lunar", moonDistKm: 384400, tiltDeg: 1.05, progress: 50 }
  };

  // =========================================================================
  // 2. INTERNATIONALIZATION (ENGLISH & KANNADA)
  // =========================================================================
  const I18N = {
    en: {
      brandTitle: "Eclipse Lab",
      brandSub: "Interactive Astronomy Observatory",
      navSim: "Simulator",
      navPhases: "Phases",
      navGuide: "Shadow Guide",
      navQuiz: "Quiz",
      heroEyebrow: "Interactive Science Project • Orbital Geometry",
      heroTitle: "Explore Solar & Lunar Eclipses in Real Time",
      heroDesc:
        "Experiment with Sun–Earth–Moon alignment, Moon distance (Perigee to Apogee), and 5.14° orbital tilt to see how Umbra, Penumbra, and Antumbra shadows create Total, Annular, and Blood Moon eclipses.",
      catSolar: "Solar Eclipse",
      catLunar: "Lunar Eclipse",
      presetSolarTotal: "Total Solar",
      presetSolarAnnular: "Annular (Ring of Fire)",
      presetSolarPartial: "Partial Solar",
      presetLunarTotal: "Total Lunar (Blood Moon)",
      presetLunarPartial: "Partial Lunar",
      presetLunarPenumbral: "Penumbral Lunar",
      spaceViewTitle: "Orbital Geometry & Shadow Cones",
      scaleNote: "Schematic view (sizes & distances not to scale)",
      toggleLabels: "Labels",
      toggleRays: "Light Rays",
      toggleOrbit: "Orbit",
      dragHint: "Drag across canvas or scrub timeline",
      btnPlay: "Play",
      btnPause: "Pause",
      btnReset: "Reset",
      progressLabel: "Eclipse Progress",
      skyViewTitle: "Observer View from Earth",
      telemetryTitle: "Live Astronomical Telemetry",
      statObscuration: "Obscuration",
      statUmbralCover: "Umbral Coverage",
      statShadowZone: "Shadow Zone",
      statApparentSizes: "Apparent Size (Moon / Sun)",
      statAlignment: "Alignment Offset",
      paramsTitle: "Orbital Parameters",
      distLabel: "Moon Distance (Perigee ↔ Apogee)",
      perigeeHint: "356,500 km (Perigee)",
      apogeeHint: "406,700 km (Apogee)",
      tiltLabel: "Orbital Tilt Offset (Node Alignment)",
      snapNode: "Align (0°)",
      nodeHint: "0° (Ecliptic Node)",
      phasesEyebrow: "Step-by-Step Contact Stages",
      phasesTitleSolar: "Stages of a Solar Eclipse",
      phasesTitleLunar: "Stages of a Lunar Eclipse",
      phasesDesc: "Click any contact stage below to jump the simulator directly to that moment.",
      guideEyebrow: "Physics & Geometry",
      guideTitle: "How Shadows Create Eclipses",
      guideDesc:
        "An extended light source like the Sun casts three distinct shadow regions behind an opaque moon or planet.",
      umbraTag: "Inner Cone",
      umbraTitle: "Umbra (Total Shadow)",
      umbraDesc:
        "The darkest central cone where all direct sunlight is completely blocked. Observers inside the Moon's umbra experience a Total Solar Eclipse; when the Moon enters Earth's umbra, a Total Lunar Eclipse occurs.",
      demoUmbra: "Demo Total Eclipse →",
      penumbraTag: "Outer Cone",
      penumbraTitle: "Penumbra (Partial Shadow)",
      penumbraDesc:
        "The wider outer region where only part of the Sun is obscured. Being inside the penumbra produces a Partial Solar Eclipse or a subtle Penumbral Lunar Eclipse.",
      demoPenumbra: "Demo Partial Eclipse →",
      antumbraTag: "Beyond Umbra Tip",
      antumbraTitle: 'Antumbra ("Ring of Fire")',
      antumbraDesc:
        "When the Moon is near Apogee (farther from Earth), its umbra ends before reaching Earth's surface. Observers in the diverging antumbra see a bright golden ring around the Moon — an Annular Solar Eclipse.",
      demoAntumbra: "Demo Annular Eclipse →",
      compareTitle: "Solar vs. Lunar Eclipse Comparison",
      colFeature: "Feature",
      colSolar: "Solar Eclipse",
      colLunar: "Lunar Eclipse",
      rowAlignLabel: "Alignment",
      rowAlignSolar: "Sun → Moon → Earth",
      rowAlignLunar: "Sun → Earth → Moon",
      rowPhaseLabel: "Moon Phase",
      rowPhaseSolar: "New Moon",
      rowPhaseLunar: "Full Moon",
      rowDurLabel: "Totality Duration",
      rowDurSolar: "Up to ~7.5 minutes",
      rowDurLunar: "Up to ~1 hr 47 min",
      rowVisLabel: "Where Visible",
      rowVisSolar: "Narrow path (~100–270 km wide)",
      rowVisLunar: "Entire night side of Earth",
      rowSafeLabel: "Eye Safety",
      rowSafeSolar: "ISO 12312-2 solar glasses required",
      rowSafeLunar: "100% safe with naked eyes",
      factsTitle: "Fascinating Eclipse Science",
      fact1Title: "Why Not Every Month?",
      fact1Body:
        "The Moon's orbit is tilted by <strong>5.14°</strong> to Earth's orbital plane (the ecliptic). Most New and Full Moons pass slightly above or below the shadow cone unless near an orbital node.",
      fact2Title: "Why Is a Total Lunar Eclipse Red?",
      fact2Body:
        "Earth's atmosphere scatters short blue wavelengths (Rayleigh scattering) and bends longer red-orange light into the umbra — projecting every sunrise and sunset on Earth onto the Moon!",
      fact3Title: "The Cosmic Coincidence (400× Ratio)",
      fact3Body:
        "The Sun is about <strong>400×</strong> wider than the Moon, and also about <strong>400×</strong> farther from Earth — making both appear ~0.5° wide in our sky.",
      quizEyebrow: "Interactive Check",
      quizTitle: "Test Your Eclipse Knowledge",
      quizScoreLabel: "Score:",
      quizNext: "Next Question →",
      quizFinish: "See Results →",
      quizRestart: "Retake Quiz",
      footerText:
        "Eclipse Lab — Built with HTML5 Canvas, CSS3 & Vanilla JavaScript. Shortcuts: Space (Play/Pause), ← / → (Scrub Phase).",
      labels: {
        sun: "Sun",
        earth: "Earth",
        moon: "Moon",
        umbra: "Umbra",
        penumbra: "Penumbra",
        antumbra: "Antumbra",
        outside: "Outside Shadow"
      },
      classifications: {
        solarTotal: "Total Solar Eclipse",
        solarAnnular: "Annular Solar Eclipse",
        solarPartial: "Partial Solar Eclipse",
        solarNone: "No Eclipse (Sun Unobscured)",
        lunarTotal: "Total Lunar Eclipse (Blood Moon)",
        lunarPartial: "Partial Lunar Eclipse",
        lunarPenumbral: "Penumbral Lunar Eclipse",
        lunarNone: "Full Moon (Outside Shadow)"
      },
      skyPhase: {
        totality: "Totality",
        annularity: "Annularity",
        diamondRing: "Diamond Ring",
        partial: "Partial Phase",
        penumbral: "Penumbral Shading",
        clear: "No Eclipse"
      },
      captions: {
        solarTotal:
          "At totality, the Moon completely blocks the Sun's bright photosphere, revealing the glowing solar corona and darkening the daytime sky to twilight.",
        solarAnnular:
          'Because the Moon is near Apogee, its apparent disc is smaller than the Sun — leaving a blazing "Ring of Fire" visible around the silhouette.',
        solarDiamond:
          "Just before or after totality, a final bead of sunlight shines through lunar valleys to create the stunning Diamond Ring effect!",
        solarPartial:
          "From inside the Penumbra, the Moon takes a crisp bite out of the Sun's disc. Always use certified ISO 12312-2 eclipse glasses to view.",
        solarNone:
          "The Moon is currently misaligned with the Sun from Earth's perspective — adjust the timeline or bring Orbital Tilt toward 0°.",
        lunarTotal:
          'Fully immersed in Earth\'s Umbra! Earth\'s atmosphere refracts long red wavelengths onto the Moon, turning it a glowing copper "Blood Moon."',
        lunarPartial:
          "Earth's curved dark Umbra glides across the lunar surface — a geometric sight that helped ancient astronomers deduce Earth is round.",
        lunarPenumbral:
          "The Moon passes only through Earth's outer Penumbra, causing a gentle, subtle dimming across one side of the Full Moon.",
        lunarNone:
          "The Full Moon sits outside Earth's shadow cones due to orbital separation or tilt."
      }
    },
    kn: {
      brandTitle: "ಗ್ರಹಣ ಪ್ರಯೋಗಶಾಲೆ",
      brandSub: "ಸಂವಾದಾತ್ಮಕ ಖಗೋಳ ವೀಕ್ಷಣಾಲಯ",
      navSim: "ಸಿಮ್ಯುಲೇಟರ್",
      navPhases: "ಹಂತಗಳು",
      navGuide: "ನೆರಳಿನ ಮಾರ್ಗದರ್ಶಿ",
      navQuiz: "ರಸಪ್ರಶ್ನೆ",
      heroEyebrow: "ಸಂವಾದಾತ್ಮಕ ವಿಜ್ಞಾನ ಯೋಜನೆ • ಕಕ್ಷೀಯ ಜ್ಯಾಮಿತಿ",
      heroTitle: "ಸೂರ್ಯ ಮತ್ತು ಚಂದ್ರಗ್ರಹಣಗಳನ್ನು ನೇರವಾಗಿ ಅನ್ವೇಷಿಸಿ",
      heroDesc:
        "ಸೂರ್ಯ–ಭೂಮಿ–ಚಂದ್ರನ ಜೋಡಣೆ, ಚಂದ್ರನ ದೂರ (ಭೂಸಮೀಪದಿಂದ ಭೂದೂರದವರೆಗೆ) ಮತ್ತು 5.14° ಕಕ್ಷೀಯ ಓರೆಯನ್ನು ಬದಲಾಯಿಸಿ ಪ್ರಚ್ಛಾಯೆ, ಉಪಚ್ಛಾಯೆ ಮತ್ತು ಪ್ರತಿ-ಪ್ರಚ್ಛಾಯೆ ನೆರಳುಗಳು ಹೇಗೆ ಗ್ರಹಣಗಳನ್ನು ಉಂಟುಮಾಡುತ್ತವೆ ಎಂಬುದನ್ನು ನೋಡಿ.",
      catSolar: "ಸೂರ್ಯಗ್ರಹಣ",
      catLunar: "ಚಂದ್ರಗ್ರಹಣ",
      presetSolarTotal: "ಪೂರ್ಣ ಸೂರ್ಯಗ್ರಹಣ",
      presetSolarAnnular: "ಕಂಕಣ (ಬೆಂಕಿಯ ಉಂಗುರ)",
      presetSolarPartial: "ಭಾಗಶಃ ಸೂರ್ಯಗ್ರಹಣ",
      presetLunarTotal: "ಪೂರ್ಣ ಚಂದ್ರಗ್ರಹಣ (ರಕ್ತ ಚಂದ್ರ)",
      presetLunarPartial: "ಭಾಗಶಃ ಚಂದ್ರಗ್ರಹಣ",
      presetLunarPenumbral: "ಉಪಚ್ಛಾಯಾ ಚಂದ್ರಗ್ರಹಣ",
      spaceViewTitle: "ಕಕ್ಷೀಯ ಜ್ಯಾಮಿತಿ ಮತ್ತು ನೆರಳಿನ ಶಂಕುಗಳು",
      scaleNote: "ರೇಖಾಚಿತ್ರ ನೋಟ (ಗಾತ್ರ ಮತ್ತು ದೂರಗಳು ನೈಜ ಪ್ರಮಾಣದಲ್ಲಿಲ್ಲ)",
      toggleLabels: "ಹೆಸರುಗಳು",
      toggleRays: "ಬೆಳಕಿನ ಕಿರಣಗಳು",
      toggleOrbit: "ಕಕ್ಷೆ",
      dragHint: "ಕ್ಯಾನ್ವಾಸ್ ಮೇಲೆ ಎಳೆಯಿರಿ ಅಥವಾ ಸ್ಲೈಡರ್ ಬಳಸಿ",
      btnPlay: "ಚಲಿಸು",
      btnPause: "ವಿರಾಮ",
      btnReset: "ಮರುಹೊಂದಿಸು",
      progressLabel: "ಗ್ರಹಣದ ಪ್ರಗತಿ",
      skyViewTitle: "ಭೂಮಿಯಿಂದ ಆಕಾಶದ ನೋಟ",
      telemetryTitle: "ನೇರ ಖಗೋಳ ಮಾಹಿತಿ",
      statObscuration: "ಮರೆಮಾಚುವಿಕೆ",
      statUmbralCover: "ಪ್ರಚ್ಛಾಯೆ ಆವರಣ",
      statShadowZone: "ನೆರಳಿನ ವಲಯ",
      statApparentSizes: "ಗೋಚರ ಗಾತ್ರ (ಚಂದ್ರ / ಸೂರ್ಯ)",
      statAlignment: "ಕಕ್ಷೀಯ ಓರೆ ಅಂತರ",
      paramsTitle: "ಕಕ್ಷೀಯ ನಿಯತಾಂಕಗಳು",
      distLabel: "ಚಂದ್ರನ ದೂರ (ಭೂಸಮೀಪ ↔ ಭೂದೂರ)",
      perigeeHint: "356,500 ಕಿ.ಮೀ (ಭೂಸಮೀಪ)",
      apogeeHint: "406,700 ಕಿ.ಮೀ (ಭೂದೂರ)",
      tiltLabel: "ಕಕ್ಷೀಯ ಓರೆ (ನೋಡ್ ಜೋಡಣೆ)",
      snapNode: "ಸರಿಹೊಂದಿಸಿ (0°)",
      nodeHint: "0° (ಗ್ರಹಣ ಸಮತಲ)",
      phasesEyebrow: "ಹಂತ ಹಂತದ ಸಂಪರ್ಕ ಬಿಂದುಗಳು",
      phasesTitleSolar: "ಸೂರ್ಯಗ್ರಹಣದ ಹಂತಗಳು",
      phasesTitleLunar: "ಚಂದ್ರಗ್ರಹಣದ ಹಂತಗಳು",
      phasesDesc: "ಸಿಮ್ಯುಲೇಟರ್ ಅನ್ನು ಆ ಕ್ಷಣಕ್ಕೆ ನೇರವಾಗಿ ಕೊಂಡೊಯ್ಯಲು ಕೆಳಗಿನ ಯಾವುದೇ ಹಂತವನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ.",
      guideEyebrow: "ಭೌತಶಾಸ್ತ್ರ ಮತ್ತು ಜ್ಯಾಮಿತಿ",
      guideTitle: "ನೆರಳುಗಳು ಗ್ರಹಣವನ್ನು ಹೇಗೆ ಸೃಷ್ಟಿಸುತ್ತವೆ",
      guideDesc:
        "ಸೂರ್ಯನಂತಹ ದೊಡ್ಡ ಬೆಳಕಿನ ಮೂಲವು ಅಪಾರದರ್ಶಕ ಚಂದ್ರ ಅಥವಾ ಭೂಮಿಯ ಹಿಂದೆ ಮೂರು ವಿಭಿನ್ನ ನೆರಳಿನ ಪ್ರದೇಶಗಳನ್ನು ಉಂಟುಮಾಡುತ್ತದೆ.",
      umbraTag: "ಒಳ ಶಂಕು",
      umbraTitle: "ಪ್ರಚ್ಛಾಯೆ (Umbra - ಪೂರ್ಣ ನೆರಳು)",
      umbraDesc:
        "ನೇರ ಸೂರ್ಯನ ಬೆಳಕು ಸಂಪೂರ್ಣವಾಗಿ ತಡೆಯಲ್ಪಡುವ ಅತ್ಯಂತ ಗಾಢವಾದ ಮಧ್ಯದ ಶಂಕು. ಚಂದ್ರನ ಪ್ರಚ್ಛಾಯೆಯೊಳಗಿರುವವರಿಗೆ ಪೂರ್ಣ ಸೂರ್ಯಗ್ರಹಣ ಕಾಣುತ್ತದೆ; ಚಂದ್ರನು ಭೂಮಿಯ ಪ್ರಚ್ಛಾಯೆಯನ್ನು ಪ್ರವೇಶಿಸಿದಾಗ ಪೂರ್ಣ ಚಂದ್ರಗ್ರಹಣ ಸಂಭವಿಸುತ್ತದೆ.",
      demoUmbra: "ಪೂರ್ಣ ಗ್ರಹಣ ನೋಡಿ →",
      penumbraTag: "ಹೊರ ಶಂಕು",
      penumbraTitle: "ಉಪಚ್ಛಾಯೆ (Penumbra - ಭಾಗಶಃ ನೆರಳು)",
      penumbraDesc:
        "ಸೂರ್ಯನ ಕೆಲವು ಭಾಗ ಮಾತ್ರ ಮರೆಯಾಗುವ ವಿಶಾಲ ಹೊರ ಪ್ರದೇಶ. ಉಪಚ್ಛಾಯೆಯಲ್ಲಿ ಭಾಗಶಃ ಸೂರ್ಯಗ್ರಹಣ ಅಥವಾ ಮಂದವಾದ ಉಪಚ್ಛಾಯಾ ಚಂದ್ರಗ್ರಹಣ ಉಂಟಾಗುತ್ತದೆ.",
      demoPenumbra: "ಭಾಗಶಃ ಗ್ರಹಣ ನೋಡಿ →",
      antumbraTag: "ಪ್ರಚ್ಛಾಯೆ ತುದಿಯ ಆಚೆ",
      antumbraTitle: 'ಪ್ರತಿ-ಪ್ರಚ್ಛಾಯೆ (Antumbra - "ಬೆಂಕಿಯ ಉಂಗುರ")',
      antumbraDesc:
        "ಚಂದ್ರನು ಭೂದೂರದಲ್ಲಿ (Apogee) ಇರುವಾಗ ಅದರ ಪ್ರಚ್ಛಾಯೆಯು ಭೂಮಿಯನ್ನು ತಲುಪುವ ಮೊದಲೇ ಮುಗಿಯುತ್ತದೆ. ಪ್ರತಿ-ಪ್ರಚ್ಛಾಯೆಯಲ್ಲಿ ಚಂದ್ರನ ಸುತ್ತ ಪ್ರಕಾಶಮಾನವಾದ ಚಿನ್ನದ ಉಂಗುರ ಕಾಣುತ್ತದೆ — ಇದೇ ಕಂಕಣ ಸೂರ್ಯಗ್ರಹಣ.",
      demoAntumbra: "ಕಂಕಣ ಗ್ರಹಣ ನೋಡಿ →",
      compareTitle: "ಸೂರ್ಯಗ್ರಹಣ ಮತ್ತು ಚಂದ್ರಗ್ರಹಣ ಹೋಲಿಕೆ",
      colFeature: "ವೈಶಿಷ್ಟ್ಯ",
      colSolar: "ಸೂರ್ಯಗ್ರಹಣ",
      colLunar: "ಚಂದ್ರಗ್ರಹಣ",
      rowAlignLabel: "ಜೋಡಣೆ",
      rowAlignSolar: "ಸೂರ್ಯ → ಚಂದ್ರ → ಭೂಮಿ",
      rowAlignLunar: "ಸೂರ್ಯ → ಭೂಮಿ → ಚಂದ್ರ",
      rowPhaseLabel: "ಚಂದ್ರನ ಕಲೆ",
      rowPhaseSolar: "ಅಮಾವಾಸ್ಯೆ (New Moon)",
      rowPhaseLunar: "ಹುಣ್ಣಿಮೆ (Full Moon)",
      rowDurLabel: "ಪೂರ್ಣ ಅವಧಿ",
      rowDurSolar: "ಸುಮಾರು 7.5 ನಿಮಿಷಗಳವರೆಗೆ",
      rowDurLunar: "ಸುಮಾರು 1 ಗಂಟೆ 47 ನಿಮಿಷಗಳವರೆಗೆ",
      rowVisLabel: "ಎಲ್ಲಿ ಗೋಚರಿಸುತ್ತದೆ",
      rowVisSolar: "ಕಿರಿದಾದ ಪಥ (~100–270 ಕಿ.ಮೀ ಅಗಲ)",
      rowVisLunar: "ಭೂಮಿಯ ಇಡೀ ರಾತ್ರಿ ಭಾಗದಲ್ಲಿ",
      rowSafeLabel: "ಕಣ್ಣಿನ ಸುರಕ್ಷತೆ",
      rowSafeSolar: "ISO 12312-2 ಗ್ರಹಣ ಕನ್ನಡಕ ಅಗತ್ಯ",
      rowSafeLunar: "ಬರಿಗಣ್ಣಿನಿಂದ 100% ಸುರಕ್ಷಿತ",
      factsTitle: "ಆಸಕ್ತಿದಾಯಕ ಗ್ರಹಣ ವಿಜ್ಞಾನ",
      fact1Title: "ಪ್ರತಿ ತಿಂಗಳು ಗ್ರಹಣ ಏಕೆ ಸಂಭವಿಸುವುದಿಲ್ಲ?",
      fact1Body:
        "ಚಂದ್ರನ ಕಕ್ಷೆಯು ಭೂಮಿಯ ಕಕ್ಷಾ ಸಮತಲಕ್ಕೆ <strong>5.14°</strong> ಓರೆಯಾಗಿದೆ. ಆದ್ದರಿಂದ ಬಹುತೇಕ ಅಮಾವಾಸ್ಯೆ ಮತ್ತು ಹುಣ್ಣಿಮೆಗಳಲ್ಲಿ ಚಂದ್ರನು ನೆರಳಿನ ಶಂಕುವಿನ ಮೇಲೆ ಅಥವಾ ಕೆಳಗೆ ಹಾದುಹೋಗುತ್ತದೆ.",
      fact2Title: "ಪೂರ್ಣ ಚಂದ್ರಗ್ರಹಣದಲ್ಲಿ ಚಂದ್ರ ಏಕೆ ಕೆಂಪಾಗಿ ಕಾಣುತ್ತದೆ?",
      fact2Body:
        "ಭೂಮಿಯ ವಾತಾವರಣವು ನೀಲಿ ಬೆಳಕನ್ನು ಚದುರಿಸಿ (Rayleigh scattering) ಕೆಂಪು-ಕಿತ್ತಳೆ ಬೆಳಕನ್ನು ಪ್ರಚ್ಛಾಯೆಯೊಳಗೆ ಬಾಗಿಸುತ್ತದೆ — ಅಂದರೆ ಭೂಮಿಯ ಎಲ್ಲಾ ಸೂರ್ಯೋದಯ ಮತ್ತು ಸೂರ್ಯಾಸ್ತಗಳ ಬೆಳಕು ಚಂದ್ರನ ಮೇಲೆ ಬೀಳುತ್ತದೆ!",
      fact3Title: "ಅದ್ಭುತ ಖಗೋಳ ಕಾಕತಾಳೀಯ (400× ಅನುಪಾತ)",
      fact3Body:
        "ಸೂರ್ಯನು ಚಂದ್ರನಿಗಿಂತ ಸುಮಾರು <strong>400 ಪಟ್ಟು</strong> ದೊಡ್ಡದಾಗಿದೆ, ಮತ್ತು ಭೂಮಿಯಿಂದ <strong>400 ಪಟ್ಟು</strong> ದೂರದಲ್ಲಿದೆ — ಹೀಗಾಗಿ ಆಕಾಶದಲ್ಲಿ ಎರಡೂ ~0.5° ಒಂದೇ ಗಾತ್ರದಲ್ಲಿ ಕಾಣುತ್ತವೆ.",
      quizEyebrow: "ಸಂವಾದಾತ್ಮಕ ಪರೀಕ್ಷೆ",
      quizTitle: "ನಿಮ್ಮ ಗ್ರಹಣ ಜ್ಞಾನವನ್ನು ಪರೀಕ್ಷಿಸಿ",
      quizScoreLabel: "ಅಂಕ:",
      quizNext: "ಮುಂದಿನ ಪ್ರಶ್ನೆ →",
      quizFinish: "ಫಲಿತಾಂಶ ನೋಡಿ →",
      quizRestart: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
      footerText:
        "ಗ್ರಹಣ ಪ್ರಯೋಗಶಾಲೆ — HTML5 Canvas, CSS3 ಮತ್ತು JavaScript ನಿಂದ ನಿರ್ಮಿತ. ಕೀಲಿಮಣೆ: Space (ಚಲನೆ/ವಿರಾಮ), ← / → (ಹಂತ ಬದಲಾವಣೆ).",
      labels: {
        sun: "ಸೂರ್ಯ",
        earth: "ಭೂಮಿ",
        moon: "ಚಂದ್ರ",
        umbra: "ಪ್ರಚ್ಛಾಯೆ",
        penumbra: "ಉಪಚ್ಛಾಯೆ",
        antumbra: "ಪ್ರತಿ-ಪ್ರಚ್ಛಾಯೆ",
        outside: "ನೆರಳಿನ ಹೊರಗೆ"
      },
      classifications: {
        solarTotal: "ಪೂರ್ಣ ಸೂರ್ಯಗ್ರಹಣ",
        solarAnnular: "ಕಂಕಣ ಸೂರ್ಯಗ್ರಹಣ",
        solarPartial: "ಭಾಗಶಃ ಸೂರ್ಯಗ್ರಹಣ",
        solarNone: "ಗ್ರಹಣವಿಲ್ಲ (ಸೂರ್ಯ ಸಂಪೂರ್ಣ ಗೋಚರ)",
        lunarTotal: "ಪೂರ್ಣ ಚಂದ್ರಗ್ರಹಣ (ರಕ್ತ ಚಂದ್ರ)",
        lunarPartial: "ಭಾಗಶಃ ಚಂದ್ರಗ್ರಹಣ",
        lunarPenumbral: "ಉಪಚ್ಛಾಯಾ ಚಂದ್ರಗ್ರಹಣ",
        lunarNone: "ಹುಣ್ಣಿಮೆ (ನೆರಳಿನ ಹೊರಗೆ)"
      },
      skyPhase: {
        totality: "ಪೂರ್ಣ ಗ್ರಹಣ",
        annularity: "ಕಂಕಣ ಹಂತ",
        diamondRing: "ವಜ್ರದ ಉಂಗುರ",
        partial: "ಭಾಗಶಃ ಹಂತ",
        penumbral: "ಉಪಚ್ಛಾಯಾ ಮಬ್ಬು",
        clear: "ಗ್ರಹಣವಿಲ್ಲ"
      },
      captions: {
        solarTotal:
          "ಪೂರ್ಣ ಸೂರ್ಯಗ್ರಹಣದಲ್ಲಿ ಚಂದ್ರನು ಸೂರ್ಯನ ಪ್ರಕಾಶಮಾನ ಭಾಗವನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ಮುಚ್ಚುತ್ತಾನೆ; ಸೂರ್ಯನ ಕರೋನಾ ಗೋಚರಿಸಿ ಹಗಲು ಸಂಜೆಯಂತೆ ಕತ್ತಲಾಗುತ್ತದೆ.",
        solarAnnular:
          'ಚಂದ್ರನು ಭೂದೂರದಲ್ಲಿದ್ದಾಗ (Apogee) ಅದು ಸೂರ್ಯನಿಗಿಂತ ಸ್ವಲ್ಪ ಚಿಕ್ಕದಾಗಿ ಕಾಣುತ್ತದೆ — ಆದ್ದರಿಂದ ಚಂದ್ರನ ಸುತ್ತ ಪ್ರಕಾಶಮಾನ "ಬೆಂಕಿಯ ಉಂಗುರ" ಕಾಣುತ್ತದೆ.',
        solarDiamond:
          "ಪೂರ್ಣ ಗ್ರಹಣದ ತಕ್ಷಣ ಮೊದಲು ಅಥವಾ ನಂತರ ಚಂದ್ರನ ಕಣಿವೆಗಳ ಮೂಲಕ ಹರಿಯುವ ಸೂರ್ಯನ ಕೊನೆಯ ಕಿರಣವು 'ವಜ್ರದ ಉಂಗುರ'ದಂತೆ ಹೊಳೆಯುತ್ತದೆ!",
        solarPartial:
          "ಉಪಚ್ಛಾಯೆಯ ಒಳಗಿನಿಂದ ಸೂರ್ಯನ ಒಂದು ಭಾಗ ಕತ್ತರಿಸಿದಂತೆ ಕಾಣುತ್ತದೆ. ವೀಕ್ಷಿಸಲು ಯಾವಾಗಲೂ ISO 12312-2 ಗ್ರಹಣ ಕನ್ನಡಕ ಬಳಸಿ.",
        solarNone:
          "ಪ್ರಸ್ತುತ ಚಂದ್ರನು ಭೂಮಿ ಮತ್ತು ಸೂರ್ಯನ ನೇರ ರೇಖೆಯಲ್ಲಿಲ್ಲ — ಟೈಮ್‌ಲೈನ್ ಸ್ಲೈಡ್ ಮಾಡಿ ಅಥವಾ ಕಕ್ಷೀಯ ಓರೆಯನ್ನು 0° ಕಡೆಗೆ ತನ್ನಿ.",
        lunarTotal:
          'ಚಂದ್ರನು ಸಂಪೂರ್ಣವಾಗಿ ಭೂಮಿಯ ಪ್ರಚ್ಛಾಯೆಯಲ್ಲಿದೆ! ಭೂಮಿಯ ವಾತಾವರಣವು ಕೆಂಪು ಬೆಳಕನ್ನು ಚಂದ್ರನ ಮೇಲೆ ವಕ್ರೀಭವನಗೊಳಿಸುವುದರಿಂದ ಅದು ತಾಮ್ರ-ಕೆಂಪು "ರಕ್ತ ಚಂದ್ರ"ವಾಗಿ ಹೊಳೆಯುತ್ತದೆ.',
        lunarPartial:
          "ಭೂಮಿಯ ವಕ್ರವಾದ ಗಾಢ ನೆರಳು ಚಂದ್ರನ ಮೇಲೆ ಹಾದುಹೋಗುತ್ತದೆ — ಭೂಮಿ ಗೋಳಾಕಾರದಲ್ಲಿದೆ ಎಂದು ಪ್ರಾಚೀನ ವಿಜ್ಞಾನಿಗಳು ಸಾಬೀತುಪಡಿಸಲು ಇದು ನೆರವಾಯಿತು.",
        lunarPenumbral:
          "ಚಂದ್ರನು ಭೂಮಿಯ ಹೊರಗಿನ ಉಪಚ್ಛಾಯೆಯ ಮೂಲಕ ಮಾತ್ರ ಹಾದುಹೋಗುತ್ತದೆ; ಇದರಿಂದ ಹುಣ್ಣಿಮೆಯ ಒಂದು ಬದಿ ಸ್ವಲ್ಪ ಮಂದವಾಗುತ್ತದೆ.",
        lunarNone:
          "ಕಕ್ಷೀಯ ಓರೆ ಅಥವಾ ಸ್ಥಾನದ ಕಾರಣ ಹುಣ್ಣಿಮೆಯ ಚಂದ್ರನು ಭೂಮಿಯ ನೆರಳಿನ ಶಂಕುಗಳ ಹೊರಗಿದೆ."
      }
    }
  };

  // Phase milestones for Solar & Lunar timelines
  const PHASE_STAGES = {
    solar: {
      en: [
        { code: "C1", progress: 12, title: "First Contact", desc: "Moon's eastern limb touches the Sun's edge — partial phase begins." },
        { code: "DR", progress: 47.2, title: "Diamond Ring", desc: "Final sunlight beams through lunar valleys just before totality." },
        { code: "MAX", progress: 50, title: "Totality / Annularity", desc: "Peak alignment — solar corona or Ring of Fire shines brightly." },
        { code: "C3", progress: 52.8, title: "Third Contact", desc: "Sunlight re-emerges on the opposite limb as totality ends." },
        { code: "C4", progress: 88, title: "Fourth Contact", desc: "Moon leaves the solar disc completely; eclipse ends." }
      ],
      kn: [
        { code: "C1", progress: 12, title: "ಮೊದಲ ಸಂಪರ್ಕ", desc: "ಚಂದ್ರನ ಅಂಚು ಸೂರ್ಯನನ್ನು ಸ್ಪರ್ಶಿಸುತ್ತದೆ — ಭಾಗಶಃ ಗ್ರಹಣ ಪ್ರಾರಂಭ." },
        { code: "DR", progress: 47.2, title: "ವಜ್ರದ ಉಂಗುರ", desc: "ಪೂರ್ಣ ಗ್ರಹಣದ ಮೊದಲು ಚಂದ್ರನ ಕಣಿವೆಗಳ ಮೂಲಕ ಹೊಳೆಯುವ ಸೂರ್ಯಕಿರಣ." },
        { code: "MAX", progress: 50, title: "ಪೂರ್ಣ / ಕಂಕಣ ಹಂತ", desc: "ಗರಿಷ್ಠ ಜೋಡಣೆ — ಸೂರ್ಯನ ಕರೋನಾ ಅಥವಾ ಬೆಂಕಿಯ ಉಂಗುರ ಗೋಚರ." },
        { code: "C3", progress: 52.8, title: "ಮೂರನೇ ಸಂಪರ್ಕ", desc: "ಪೂರ್ಣ ಗ್ರಹಣ ಮುಗಿದು ಮತ್ತೊಂದು ಬದಿಯಿಂದ ಸೂರ್ಯನ ಬೆಳಕು ಮರಳುತ್ತದೆ." },
        { code: "C4", progress: 88, title: "ನಾಲ್ಕನೇ ಸಂಪರ್ಕ", desc: "ಚಂದ್ರನು ಸೂರ್ಯನಿಂದ ಸಂಪೂರ್ಣವಾಗಿ ದೂರ ಸರಿದು ಗ್ರಹಣ ಕೊನೆಗೊಳ್ಳುತ್ತದೆ." }
      ]
    },
    lunar: {
      en: [
        { code: "P1", progress: 8, title: "Penumbral Ingress", desc: "Moon enters Earth's outer penumbra; subtle shading begins." },
        { code: "U1", progress: 21, title: "Umbral Ingress", desc: "Earth's dark curved umbra starts sweeping across the lunar disc." },
        { code: "MAX", progress: 50, title: "Maximum Blood Moon", desc: "Deepest inside Earth's umbra; refracted sunlight turns Moon copper-red." },
        { code: "U4", progress: 79, title: "Umbral Egress", desc: "Moon exits the dark umbra; partial phase draws to a close." },
        { code: "P4", progress: 92, title: "Penumbral Egress", desc: "Moon exits Earth's penumbra completely, returning to bright Full Moon." }
      ],
      kn: [
        { code: "P1", progress: 8, title: "ಉಪಚ್ಛಾಯಾ ಪ್ರವೇಶ", desc: "ಚಂದ್ರನು ಭೂಮಿಯ ಹೊರ ಉಪಚ್ಛಾಯೆಯನ್ನು ಪ್ರವೇಶಿಸುತ್ತದೆ; ಸ್ವಲ್ಪ ಮಬ್ಬು ಪ್ರಾರಂಭ." },
        { code: "U1", progress: 21, title: "ಪ್ರಚ್ಛಾಯಾ ಪ್ರವೇಶ", desc: "ಭೂಮಿಯ ಗಾಢ ವಕ್ರ ನೆರಳು ಚಂದ್ರನ ಮೇಲೆ ಹರಡಲು ಪ್ರಾರಂಭವಾಗುತ್ತದೆ." },
        { code: "MAX", progress: 50, title: "ಗರಿಷ್ಠ ರಕ್ತ ಚಂದ್ರ", desc: "ಭೂಮಿಯ ಪ್ರಚ್ಛಾಯೆಯ ಮಧ್ಯದಲ್ಲಿ ಚಂದ್ರನು ತಾಮ್ರ-ಕೆಂಪು ಬಣ್ಣದಲ್ಲಿ ಹೊಳೆಯುತ್ತದೆ." },
        { code: "U4", progress: 79, title: "ಪ್ರಚ್ಛಾಯಾ ನಿರ್ಗಮನ", desc: "ಚಂದ್ರನು ಗಾಢ ಪ್ರಚ್ಛಾಯೆಯಿಂದ ಹೊರಬರುತ್ತದೆ; ಭಾಗಶಃ ಹಂತ ಮುಕ್ತಾಯ." },
        { code: "P4", progress: 92, title: "ಉಪಚ್ಛಾಯಾ ನಿರ್ಗಮನ", desc: "ಚಂದ್ರನು ಸಂಪೂರ್ಣ ನೆರಳಿನಿಂದ ಹೊರಬಂದು ಪ್ರಕಾಶಮಾನ ಹುಣ್ಣಿಮೆಯಾಗುತ್ತದೆ." }
      ]
    }
  };

  // Quiz Questions (EN + KN)
  const QUIZ_DATA = [
    {
      en: {
        q: "During which Moon phase does a Solar Eclipse always occur?",
        options: ["Full Moon", "New Moon", "First Quarter", "Waning Gibbous"],
        answer: 1,
        exp: "A Solar Eclipse requires the Moon to pass directly between the Sun and Earth, which only happens during a New Moon."
      },
      kn: {
        q: "ಸೂರ್ಯಗ್ರಹಣವು ಯಾವಾಗಲೂ ಚಂದ್ರನ ಯಾವ ಕಲೆಯಲ್ಲಿ ಸಂಭವಿಸುತ್ತದೆ?",
        options: ["ಹುಣ್ಣಿಮೆ (Full Moon)", "ಅಮಾವಾಸ್ಯೆ (New Moon)", "ಶುಕ್ಲ ಪಕ್ಷ ಅಷ್ಟಮಿ", "ಕೃಷ್ಣ ಪಕ್ಷ"],
        answer: 1,
        exp: "ಸೂರ್ಯಗ್ರಹಣವಾಗಲು ಚಂದ್ರನು ಸೂರ್ಯ ಮತ್ತು ಭೂಮಿಯ ನಡುವೆ ಬರಬೇಕು; ಇದು ಅಮಾವಾಸ್ಯೆಯಂದು ಮಾತ್ರ ಸಾಧ್ಯ."
      }
    },
    {
      en: {
        q: 'What causes an Annular ("Ring of Fire") Solar Eclipse instead of a Total Solar Eclipse?',
        options: [
          "Earth moves closer to Mars",
          "The Moon is near Apogee (farther from Earth), so its umbra ends before reaching Earth",
          "The Sun expands in summer",
          "Earth's atmosphere bends light around the Moon"
        ],
        answer: 1,
        exp: "Near Apogee (~406,700 km), the Moon's apparent diameter (~29.8') is smaller than the Sun's (~32.0'), placing Earth inside the Antumbra."
      },
      kn: {
        q: "ಪೂರ್ಣ ಸೂರ್ಯಗ್ರಹಣದ ಬದಲು ಕಂಕಣ ('ಬೆಂಕಿಯ ಉಂಗುರ') ಸೂರ್ಯಗ್ರಹಣ ಏಕೆ ಉಂಟಾಗುತ್ತದೆ?",
        options: [
          "ಭೂಮಿಯು ಮಂಗಳ ಗ್ರಹಕ್ಕೆ ಹತ್ತಿರ ಬರುವುದರಿಂದ",
          "ಚಂದ್ರನು ಭೂದೂರದಲ್ಲಿ (Apogee) ಇರುವುದರಿಂದ ಅದರ ಪ್ರಚ್ಛಾಯೆ ಭೂಮಿಯನ್ನು ತಲುಪುವುದಿಲ್ಲ",
          "ಬೇಸಿಗೆಯಲ್ಲಿ ಸೂರ್ಯನು ಹಿಗ್ಗುವುದರಿಂದ",
          "ಭೂಮಿಯ ವಾತಾವರಣ ಬೆಳಕನ್ನು ಬಾಗಿಸುವುದರಿಂದ"
        ],
        answer: 1,
        exp: "ಚಂದ್ರನು ಭೂದೂರದಲ್ಲಿದ್ದಾಗ (~406,700 ಕಿ.ಮೀ) ಅದು ಸೂರ್ಯನಿಗಿಂತ ಚಿಕ್ಕದಾಗಿ ಕಾಣುತ್ತದೆ ಮತ್ತು ಭೂಮಿಯು ಪ್ರತಿ-ಪ್ರಚ್ಛಾಯೆಯಲ್ಲಿ (Antumbra) ಇರುತ್ತದೆ."
      }
    },
    {
      en: {
        q: "Why do eclipses NOT happen every single New Moon and Full Moon?",
        options: [
          "The Moon stops orbiting once a month",
          "Sunlight is too weak during winter",
          "The Moon's orbit is tilted by ~5.14° relative to Earth's orbital plane",
          "Earth rotates too fast for shadows to form"
        ],
        answer: 2,
        exp: "Because of the ~5.14° orbital inclination, the Moon usually passes above or below the Sun–Earth line unless it is near an orbital node."
      },
      kn: {
        q: "ಪ್ರತಿ ಅಮಾವಾಸ್ಯೆ ಮತ್ತು ಹುಣ್ಣಿಮೆಯಂದು ಗ್ರಹಣಗಳು ಏಕೆ ಸಂಭವಿಸುವುದಿಲ್ಲ?",
        options: [
          "ಚಂದ್ರನು ತಿಂಗಳಿಗೊಮ್ಮೆ ಸುತ್ತುವುದನ್ನು ನಿಲ್ಲಿಸುವುದರಿಂದ",
          "ಚಳಿಗಾಲದಲ್ಲಿ ಸೂರ್ಯನ ಬೆಳಕು ಕಡಿಮೆಯಿರುವುದರಿಂದ",
          "ಚಂದ್ರನ ಕಕ್ಷೆಯು ಭೂಮಿಯ ಕಕ್ಷಾ ಸಮತಲಕ್ಕೆ ~5.14° ಓರೆಯಾಗಿರುವುದರಿಂದ",
          "ಭೂಮಿಯು ಅತಿ ವೇಗವಾಗಿ ತಿರುಗುವುದರಿಂದ"
        ],
        answer: 2,
        exp: "ಚಂದ್ರನ ಕಕ್ಷೆಯ ~5.14° ಓರೆಯ ಕಾರಣ, ಚಂದ್ರನು ನೋಡ್ ಬಳಿ ಇಲ್ಲದಿದ್ದಾಗ ನೆರಳಿನ ಶಂಕುವಿನ ಮೇಲೆ ಅಥವಾ ಕೆಳಗೆ ಹಾದುಹೋಗುತ್ತದೆ."
      }
    },
    {
      en: {
        q: "Why does the Moon appear copper-red during a Total Lunar Eclipse?",
        options: [
          "Lunar volcanoes erupt during totality",
          "Earth's atmosphere scatters blue light and refracts red sunlight into the umbra",
          "Mars reflects red light onto the Moon",
          "The Moon cools down rapidly"
        ],
        answer: 1,
        exp: "Rayleigh scattering removes short blue wavelengths in Earth's atmosphere, bending long red-orange wavelengths into Earth's umbra."
      },
      kn: {
        q: "ಪೂರ್ಣ ಚಂದ್ರಗ್ರಹಣದಲ್ಲಿ ಚಂದ್ರನು ತಾಮ್ರ-ಕೆಂಪು ಬಣ್ಣದಲ್ಲಿ ಏಕೆ ಕಾಣುತ್ತದೆ?",
        options: [
          "ಚಂದ್ರನ ಜ್ವಾಲಾಮುಖಿಗಳು ಸ್ಫೋಟಿಸುವುದರಿಂದ",
          "ಭೂಮಿಯ ವಾತಾವರಣ ನೀಲಿ ಬೆಳಕನ್ನು ಚದುರಿಸಿ ಕೆಂಪು ಬೆಳಕನ್ನು ಪ್ರಚ್ಛಾಯೆಗೆ ಬಾಗಿಸುವುದರಿಂದ",
          "ಮಂಗಳ ಗ್ರಹವು ಕೆಂಪು ಬೆಳಕನ್ನು ಪ್ರತಿಫಲಿಸುವುದರಿಂದ",
          "ಚಂದ್ರನು ವೇಗವಾಗಿ ತಣ್ಣಗಾಗುವುದರಿಂದ"
        ],
        answer: 1,
        exp: "ರೇಲೀ ಚದುರುವಿಕೆ (Rayleigh scattering) ನೀಲಿ ಕಿರಣಗಳನ್ನು ಚದುರಿಸಿ ಕೆಂಪು-ಕಿತ್ತಳೆ ಬೆಳಕನ್ನು ಭೂಮಿಯ ಪ್ರಚ್ಛಾಯೆಯೊಳಗೆ ವಕ್ರೀಭವನಗೊಳಿಸುತ್ತದೆ."
      }
    },
    {
      en: {
        q: "Which statement about eclipse eye safety is scientifically true?",
        options: [
          "Lunar eclipses require dark welding goggles",
          "Solar eclipses are safe to view with regular sunglasses",
          "Lunar eclipses are completely safe with naked eyes; Solar eclipses require ISO 12312-2 filters (except brief totality)",
          "Both eclipses emit harmful X-rays"
        ],
        answer: 2,
        exp: "A Lunar Eclipse merely reflects sunlight dimmer than a Full Moon and is 100% safe. Viewing any exposed solar photosphere directly requires ISO 12312-2 certified filters."
      },
      kn: {
        q: "ಗ್ರಹಣ ವೀಕ್ಷಣೆಯ ಕಣ್ಣಿನ ಸುರಕ್ಷತೆಯ ಬಗ್ಗೆ ಯಾವ ಹೇಳಿಕೆ ಸರಿ?",
        options: [
          "ಚಂದ್ರಗ್ರಹಣ ನೋಡಲು ವಿಶೇಷ ಗಾಗಲ್ಸ್ ಬೇಕು",
          "ಸಾಧಾರಣ ಸನ್‌ಗ್ಲಾಸ್‌ನಿಂದ ಸೂರ್ಯಗ್ರಹಣ ನೋಡಬಹುದು",
          "ಚಂದ್ರಗ್ರಹಣ ಬರಿಗಣ್ಣಿನಿಂದ 100% ಸುರಕ್ಷಿತ; ಸೂರ್ಯಗ್ರಹಣಕ್ಕೆ ISO 12312-2 ಫಿಲ್ಟರ್ ಅಗತ್ಯ",
          "ಎರಡೂ ಗ್ರಹಣಗಳು ಹಾನಿಕಾರಕ ಎಕ್ಸ್-ರೇಗಳನ್ನು ಹೊರಸೂಸುತ್ತವೆ"
        ],
        answer: 2,
        exp: "ಚಂದ್ರಗ್ರಹಣವನ್ನು ಬರಿಗಣ್ಣಿನಿಂದ ನೋಡುವುದು ಸಂಪೂರ್ಣ ಸುರಕ್ಷಿತ. ಆದರೆ ಸೂರ್ಯಗ್ರಹಣದ ಭಾಗಶಃ ಅಥವಾ ಕಂಕಣ ಹಂತಗಳನ್ನು ISO 12312-2 ಕನ್ನಡಕದಿಂದಲೇ ನೋಡಬೇಕು."
      }
    },
    {
      en: {
        q: "What is the darkest central region of a shadow where all direct sunlight is blocked?",
        options: ["Penumbra", "Umbra", "Antumbra", "Corona"],
        answer: 1,
        exp: "The Umbra is the inner shadow cone where the light source is completely blocked by the occluding body."
      },
      kn: {
        q: "ನೇರ ಸೂರ್ಯನ ಬೆಳಕು ಸಂಪೂರ್ಣವಾಗಿ ತಡೆಯಲ್ಪಡುವ ಅತ್ಯಂತ ಗಾಢವಾದ ಮಧ್ಯದ ನೆರಳಿನ ಭಾಗ ಯಾವುದು?",
        options: ["ಉಪಚ್ಛಾಯೆ (Penumbra)", "ಪ್ರಚ್ಛಾಯೆ (Umbra)", "ಪ್ರತಿ-ಪ್ರಚ್ಛಾಯೆ (Antumbra)", "ಕರೋನಾ (Corona)"],
        answer: 1,
        exp: "ಪ್ರಚ್ಛಾಯೆ (Umbra) ಎಂದರೆ ಬೆಳಕಿನ ಮೂಲವು ಸಂಪೂರ್ಣವಾಗಿ ಮರೆಯಾಗುವ ಅತ್ಯಂತ ಗಾಢವಾದ ಒಳ ಶಂಕು."
      }
    }
  ];

  // =========================================================================
  // 3. APPLICATION STATE & DOM REFERENCES
  // =========================================================================
  const state = {
    lang: "en",
    category: "solar",
    preset: "solar-total",
    moonDistKm: 360000,
    tiltDeg: 0,
    progress: 50, // 0 to 100
    playing: true,
    speed: 1,
    showLabels: true,
    showRays: true,
    showOrbit: true,
    isDragging: false,
    quizIndex: 0,
    quizScore: 0,
    quizAnswered: false,
    quizSelected: null,
    quizDone: false,
    lastFrameTime: 0,
    timeSec: 0
  };

  const dom = {
    spaceCanvas: document.getElementById("spaceCanvas"),
    skyCanvas: document.getElementById("skyCanvas"),
    statusBadge: document.getElementById("statusBadge"),
    skyPhaseBadge: document.getElementById("skyPhaseBadge"),
    skyCaption: document.getElementById("skyCaption"),
    statObscuration: document.getElementById("statObscuration"),
    statObscurationLabel: document.querySelector('[data-i18n="statObscuration"]'),
    statShadowZone: document.getElementById("statShadowZone"),
    statApparentSizes: document.getElementById("statApparentSizes"),
    statAlignment: document.getElementById("statAlignment"),
    progressSlider: document.getElementById("progressSlider"),
    progressValue: document.getElementById("progressValue"),
    distanceSlider: document.getElementById("distanceSlider"),
    distanceValue: document.getElementById("distanceValue"),
    tiltSlider: document.getElementById("tiltSlider"),
    tiltValue: document.getElementById("tiltValue"),
    snapNodeBtn: document.getElementById("snapNodeBtn"),
    playPauseBtn: document.getElementById("playPauseBtn"),
    playIcon: document.getElementById("playIcon"),
    pauseIcon: document.getElementById("pauseIcon"),
    playPauseLabel: document.getElementById("playPauseLabel"),
    resetBtn: document.getElementById("resetBtn"),
    toggleLabels: document.getElementById("toggleLabels"),
    toggleRays: document.getElementById("toggleRays"),
    toggleOrbit: document.getElementById("toggleOrbit"),
    phaseCards: document.getElementById("phaseCards"),
    phasesHeading: document.getElementById("phasesHeading"),
    quizScoreDisplay: document.getElementById("quizScoreDisplay"),
    quizProgressBar: document.getElementById("quizProgressBar"),
    quizBody: document.getElementById("quizBody"),
    quizSummary: document.getElementById("quizSummary"),
    quizCounter: document.getElementById("quizCounter"),
    quizQuestion: document.getElementById("quizQuestion"),
    quizOptions: document.getElementById("quizOptions"),
    quizFeedback: document.getElementById("quizFeedback"),
    quizNextBtn: document.getElementById("quizNextBtn"),
    summaryBadge: document.getElementById("summaryBadge"),
    summaryTitle: document.getElementById("summaryTitle"),
    summaryText: document.getElementById("summaryText"),
    quizRestartBtn: document.getElementById("quizRestartBtn")
  };

  // Pre-generated static starfields for crisp consistent rendering
  const spaceStars = createStarfield(130, 42);
  const skyStars = createStarfield(85, 99);

  function createStarfield(count, seedStart) {
    let seed = seedStart;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: rand(),
        y: rand(),
        r: 0.5 + rand() * 1.35,
        alpha: 0.25 + rand() * 0.65,
        twinkleOffset: rand() * Math.PI * 2
      });
    }
    return stars;
  }

  // =========================================================================
  // 4. ASTRONOMICAL COMPUTATION ENGINE
  // =========================================================================
  function circleIntersectionArea(r1, r2, d) {
    if (d >= r1 + r2) return 0;
    if (d <= Math.abs(r1 - r2)) {
      const rMin = Math.min(r1, r2);
      return Math.PI * rMin * rMin;
    }
    const r1Sq = r1 * r1;
    const r2Sq = r2 * r2;
    const dSq = d * d;
    const alpha = Math.acos(Math.max(-1, Math.min(1, (dSq + r1Sq - r2Sq) / (2 * d * r1))));
    const beta = Math.acos(Math.max(-1, Math.min(1, (dSq + r2Sq - r1Sq) / (2 * d * r2))));
    const term = Math.max(0, (-d + r1 + r2) * (d + r1 - r2) * (d - r1 + r2) * (d + r1 + r2));
    return r1Sq * alpha + r2Sq * beta - 0.5 * Math.sqrt(term);
  }

  function computeAstronomy() {
    const dKm = state.moonDistKm;
    const sunAngRad = Math.asin(ASTRO.SUN_RADIUS_KM / ASTRO.SUN_EARTH_DIST_KM);
    const sunRadiusArcmin = sunAngRad * ASTRO.RAD_TO_ARCMIN; // ~16.0'

    const effMoonDist =
      state.category === "solar" ? dKm - ASTRO.EARTH_RADIUS_KM : dKm;
    const moonAngRad = Math.asin(ASTRO.MOON_RADIUS_KM / effMoonDist);
    const moonRadiusArcmin = moonAngRad * ASTRO.RAD_TO_ARCMIN;

    const dyArcmin = state.tiltDeg * 60; // Positive tilt shifts Moon upward in sky
    const tNorm = (state.progress - 50) / 50; // -1..+1

    if (state.category === "solar") {
      const dxArcmin = tNorm * 36; // Sweeps -36' to +36' across Sun
      const sepArcmin = Math.hypot(dxArcmin, dyArcmin);
      const sunArea = Math.PI * sunRadiusArcmin * sunRadiusArcmin;
      const overlapArea = circleIntersectionArea(sunRadiusArcmin, moonRadiusArcmin, sepArcmin);
      const obscurationPct = (overlapArea / sunArea) * 100;

      const moonBigger = moonRadiusArcmin >= sunRadiusArcmin;
      let classificationKey = "solarNone";
      let skyPhaseKey = "clear";
      let captionKey = "solarNone";
      let shadowZoneKey = "outside";

      if (sepArcmin >= sunRadiusArcmin + moonRadiusArcmin) {
        classificationKey = "solarNone";
        skyPhaseKey = "clear";
        captionKey = "solarNone";
        shadowZoneKey = "outside";
      } else if (sepArcmin <= Math.abs(moonRadiusArcmin - sunRadiusArcmin)) {
        if (moonBigger) {
          classificationKey = "solarTotal";
          skyPhaseKey = "totality";
          captionKey = "solarTotal";
          shadowZoneKey = "umbra";
        } else {
          classificationKey = "solarAnnular";
          skyPhaseKey = "annularity";
          captionKey = "solarAnnular";
          shadowZoneKey = "antumbra";
        }
      } else {
        classificationKey = "solarPartial";
        shadowZoneKey = "penumbra";
        if (obscurationPct >= 96 && moonBigger) {
          skyPhaseKey = "diamondRing";
          captionKey = "solarDiamond";
        } else {
          skyPhaseKey = "partial";
          captionKey = "solarPartial";
        }
      }

      // Normalized sky darkening (0 = bright day, 1 = deep totality twilight)
      const skyDarkness =
        classificationKey === "solarTotal"
          ? 1
          : Math.pow(Math.max(0, obscurationPct / 100), 2.4) * 0.72;

      return {
        mode: "solar",
        sunRadiusArcmin,
        moonRadiusArcmin,
        dxArcmin,
        dyArcmin,
        sepArcmin,
        obscurationPct,
        skyDarkness,
        moonBigger,
        classificationKey,
        skyPhaseKey,
        captionKey,
        shadowZoneKey
      };
    }

    // Lunar Eclipse geometry at Moon distance dKm
    const solarParallaxArcmin = Math.asin(ASTRO.EARTH_RADIUS_KM / ASTRO.SUN_EARTH_DIST_KM) * ASTRO.RAD_TO_ARCMIN;
    const lunarParallaxArcmin = Math.asin(ASTRO.EARTH_RADIUS_KM / dKm) * ASTRO.RAD_TO_ARCMIN;
    const umbraRadiusArcmin = lunarParallaxArcmin + solarParallaxArcmin - sunRadiusArcmin;
    const penumbraRadiusArcmin = lunarParallaxArcmin + solarParallaxArcmin + sunRadiusArcmin;

    const dxArcmin = tNorm * 96; // Sweeps -96' to +96' across Earth's shadows
    const sepArcmin = Math.hypot(dxArcmin, dyArcmin);
    const moonArea = Math.PI * moonRadiusArcmin * moonRadiusArcmin;
    const umbralArea = circleIntersectionArea(moonRadiusArcmin, umbraRadiusArcmin, sepArcmin);
    const penumbralArea = circleIntersectionArea(moonRadiusArcmin, penumbraRadiusArcmin, sepArcmin);

    const umbralCoveragePct = (umbralArea / moonArea) * 100;
    const penumbralCoveragePct = (penumbralArea / moonArea) * 100;

    let classificationKey = "lunarNone";
    let skyPhaseKey = "clear";
    let captionKey = "lunarNone";
    let shadowZoneKey = "outside";

    if (sepArcmin <= umbraRadiusArcmin - moonRadiusArcmin) {
      classificationKey = "lunarTotal";
      skyPhaseKey = "totality";
      captionKey = "lunarTotal";
      shadowZoneKey = "umbra";
    } else if (sepArcmin < umbraRadiusArcmin + moonRadiusArcmin) {
      classificationKey = "lunarPartial";
      skyPhaseKey = "partial";
      captionKey = "lunarPartial";
      shadowZoneKey = "umbra";
    } else if (sepArcmin < penumbraRadiusArcmin + moonRadiusArcmin) {
      classificationKey = "lunarPenumbral";
      skyPhaseKey = "penumbral";
      captionKey = "lunarPenumbral";
      shadowZoneKey = "penumbra";
    }

    return {
      mode: "lunar",
      sunRadiusArcmin,
      moonRadiusArcmin,
      umbraRadiusArcmin,
      penumbraRadiusArcmin,
      dxArcmin,
      dyArcmin,
      sepArcmin,
      obscurationPct: umbralCoveragePct > 0 ? umbralCoveragePct : penumbralCoveragePct * 0.25,
      umbralCoveragePct,
      penumbralCoveragePct,
      classificationKey,
      skyPhaseKey,
      captionKey,
      shadowZoneKey
    };
  }

  // =========================================================================
  // 5. 2D TANGENT SHADOW CONE GEOMETRY HELPER
  // =========================================================================
  function computeShadowCones(sx, sy, rs, bx, by, rb, farLength) {
    const dx = bx - sx;
    const dy = by - sy;
    const dist = Math.hypot(dx, dy);
    if (dist <= rs + rb + 1) return null;

    const theta = Math.atan2(dy, dx);
    const ux = Math.cos(theta);
    const uy = Math.sin(theta);

    // External tangents -> Umbra + Antumbra
    const cosExt = Math.max(-1, Math.min(1, (rs - rb) / dist));
    const phiExt = Math.acos(cosExt);
    const aExtPlus = theta + phiExt;
    const aExtMinus = theta - phiExt;

    const sExtPlus = { x: sx + rs * Math.cos(aExtPlus), y: sy + rs * Math.sin(aExtPlus) };
    const sExtMinus = { x: sx + rs * Math.cos(aExtMinus), y: sy + rs * Math.sin(aExtMinus) };
    const bExtPlus = { x: bx + rb * Math.cos(aExtPlus), y: by + rb * Math.sin(aExtPlus) };
    const bExtMinus = { x: bx + rb * Math.cos(aExtMinus), y: by + rb * Math.sin(aExtMinus) };

    const apexDist = (dist * rb) / Math.max(0.01, rs - rb);
    const apex = { x: bx + ux * apexDist, y: by + uy * apexDist };

    // Extend rays past apex for Antumbra
    const d1x = apex.x - bExtPlus.x;
    const d1y = apex.y - bExtPlus.y;
    const d1Len = Math.hypot(d1x, d1y) || 1;
    const antFarPlus = {
      x: apex.x + (d1x / d1Len) * farLength,
      y: apex.y + (d1y / d1Len) * farLength
    };

    const d2x = apex.x - bExtMinus.x;
    const d2y = apex.y - bExtMinus.y;
    const d2Len = Math.hypot(d2x, d2y) || 1;
    const antFarMinus = {
      x: apex.x + (d2x / d2Len) * farLength,
      y: apex.y + (d2y / d2Len) * farLength
    };

    // Internal tangents -> Penumbra
    const cosInt = Math.max(-1, Math.min(1, (rs + rb) / dist));
    const phiInt = Math.acos(cosInt);
    const aIntPlus = theta + phiInt;
    const aIntMinus = theta - phiInt;

    const sIntPlus = { x: sx + rs * Math.cos(aIntPlus), y: sy + rs * Math.sin(aIntPlus) };
    const sIntMinus = { x: sx + rs * Math.cos(aIntMinus), y: sy + rs * Math.sin(aIntMinus) };
    const bIntMinus = { x: bx - rb * Math.cos(aIntPlus), y: by - rb * Math.sin(aIntPlus) };
    const bIntPlus = { x: bx - rb * Math.cos(aIntMinus), y: by - rb * Math.sin(aIntMinus) };

    const penDirTopX = bIntPlus.x - sIntMinus.x;
    const penDirTopY = bIntPlus.y - sIntMinus.y;
    const penTopLen = Math.hypot(penDirTopX, penDirTopY) || 1;
    const penFarTop = {
      x: bIntPlus.x + (penDirTopX / penTopLen) * farLength,
      y: bIntPlus.y + (penDirTopY / penTopLen) * farLength
    };

    const penDirBotX = bIntMinus.x - sIntPlus.x;
    const penDirBotY = bIntMinus.y - sIntPlus.y;
    const penBotLen = Math.hypot(penDirBotX, penDirBotY) || 1;
    const penFarBot = {
      x: bIntMinus.x + (penDirBotX / penBotLen) * farLength,
      y: bIntMinus.y + (penDirBotY / penBotLen) * farLength
    };

    return {
      apex,
      sExtPlus,
      sExtMinus,
      bExtPlus,
      bExtMinus,
      antFarPlus,
      antFarMinus,
      sIntPlus,
      sIntMinus,
      bIntPlus,
      bIntMinus,
      penFarTop,
      penFarBot,
      ux,
      uy
    };
  }

  // =========================================================================
  // 6. CANVAS RENDERING: SPACE ORBITAL GEOMETRY
  // =========================================================================
  function syncCanvasResolution(canvas) {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetW = Math.max(1, Math.round(rect.width * dpr));
    const targetH = Math.max(1, Math.round(rect.height * dpr));
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, width: rect.width, height: rect.height };
  }

  function drawSpaceScene(astro) {
    const { ctx, width: W, height: H } = syncCanvasResolution(dom.spaceCanvas);
    if (W < 10 || H < 10) return;

    const unit = Math.min(W / 900, H / 480);
    const cy = H * 0.5;
    const tDict = I18N[state.lang].labels;

    // 1. Background & Stars
    const bgGrad = ctx.createRadialGradient(W * 0.12, cy, 10, W * 0.5, cy, W * 0.9);
    bgGrad.addColorStop(0, "#10162b");
    bgGrad.addColorStop(0.45, "#070b18");
    bgGrad.addColorStop(1, "#03050c");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    for (const s of spaceStars) {
      const twinkle = 0.72 + 0.28 * Math.sin(state.timeSec * 1.6 + s.twinkleOffset);
      ctx.fillStyle = `rgba(226, 232, 240, ${(s.alpha * twinkle).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Positions calibrated to real Perigee/Apogee transition
    const distNorm =
      (state.moonDistKm - ASTRO.MIN_MOON_DIST_KM) /
      (ASTRO.MAX_MOON_DIST_KM - ASTRO.MIN_MOON_DIST_KM); // 0 = Perigee, 1 = Apogee

    const sunX = W * 0.11;
    const sunY = cy;
    const sunR = (state.category === "solar" ? 50 : 48) * unit;

    const earthX = (state.category === "solar" ? 0.80 : 0.50) * W;
    const earthY = cy;
    const earthR = (state.category === "solar" ? 31 : 30) * unit;
    const moonR = (state.category === "solar" ? 15.5 : 9.2) * unit;

    // Moon base orbital X calibrated so Solar Umbra apex hits Earth front surface at 379,700 km
    const moonBaseX =
      state.category === "solar"
        ? (0.625 - 0.091 * distNorm) * W
        : (0.725 + 0.045 * distNorm) * W;

    const rOrb = Math.abs(earthX - moonBaseX);
    const tProgress = (state.progress - 50) / 50; // -1..+1
    const sweepAngle = tProgress * (state.category === "solar" ? 0.44 : 0.48);

    // Smooth visual tilt displacement
    const tiltShiftY = ((state.tiltDeg * 25) / (1 + Math.abs(state.tiltDeg) * 0.15)) * unit;

    // 3D oblique projection around Earth
    const signX = state.category === "solar" ? -1 : 1;
    const relX = signX * rOrb * Math.cos(sweepAngle);
    const relZ = rOrb * Math.sin(sweepAngle); // depth across shadow axis
    const relY = tiltShiftY;

    const projSkewX = 0.12;
    const projElevY = 0.25;

    const moonX = earthX + relX + relZ * projSkewX;
    const moonY = earthY - relY + relZ * projElevY;

    // Ecliptic Reference Line
    ctx.save();
    ctx.strokeStyle = "rgba(148, 163, 184, 0.14)";
    ctx.setLineDash([5, 6]);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(sunX, cy);
    ctx.lineTo(W * 0.96, cy);
    ctx.stroke();
    ctx.restore();

    // 3. Moon Orbit Ring (tilted)
    if (state.showOrbit) {
      drawTiltedOrbitRing(ctx, earthX, earthY, rOrb, tiltShiftY, projSkewX, projElevY, relZ <= 0);
    }

    // 4. Determine Drawing Depth Order & Shadow Cones
    const occluder =
      state.category === "solar"
        ? { x: moonX, y: moonY, r: moonR }
        : { x: earthX, y: earthY, r: earthR };

    const cones = computeShadowCones(
      sunX,
      sunY,
      sunR,
      occluder.x,
      occluder.y,
      occluder.r,
      W * 0.95
    );

    // Draw Penumbra, Antumbra, and Umbra behind occluder
    if (cones) {
      drawShadowCones(ctx, cones, occluder, W, unit, tDict);
    }

    // Draw Sun
    drawSpaceSun(ctx, sunX, sunY, sunR);

    // Draw Moon behind Earth if Z < 0, or Earth then Moon if Z >= 0
    if (state.category === "solar") {
      if (relZ < 0) {
        drawSpaceMoon(ctx, moonX, moonY, moonR, astro, false);
        drawSpaceEarth(ctx, earthX, earthY, earthR, astro);
      } else {
        drawSpaceEarth(ctx, earthX, earthY, earthR, astro);
        drawSpaceMoon(ctx, moonX, moonY, moonR, astro, false);
      }
    } else {
      drawSpaceEarth(ctx, earthX, earthY, earthR, astro);
      drawSpaceMoon(ctx, moonX, moonY, moonR, astro, true);
    }

    // Front half of Orbit Ring for crisp 3D depth
    if (state.showOrbit) {
      drawTiltedOrbitRing(ctx, earthX, earthY, rOrb, tiltShiftY, projSkewX, projElevY, true);
    }

    // 5. Optional Labels
    if (state.showLabels) {
      drawBodyLabel(ctx, sunX, sunY + sunR + 18 * unit, tDict.sun, "#fde68a");
      drawBodyLabel(ctx, earthX, earthY + earthR + 18 * unit, tDict.earth, "#7dd3fc");
      drawBodyLabel(
        ctx,
        moonX,
        moonY - moonR - 11 * unit,
        tDict.moon,
        "#e2e8f0"
      );
    }
  }

  function drawTiltedOrbitRing(ctx, ex, ey, rOrb, tiltShiftY, skewX, elevY, frontOnly) {
    ctx.save();
    ctx.strokeStyle = frontOnly
      ? "rgba(56, 189, 248, 0.34)"
      : "rgba(56, 189, 248, 0.14)";
    ctx.lineWidth = frontOnly ? 1.5 : 1.1;
    ctx.setLineDash([4, 5]);
    ctx.beginPath();

    const steps = 72;
    let started = false;
    for (let i = 0; i <= steps; i++) {
      const a = (i / steps) * Math.PI * 2;
      const rx = rOrb * Math.cos(a);
      const rz = rOrb * Math.sin(a);
      // Tilt shifts the active side vertically while maintaining closed ellipse
      const ry = (state.category === "solar" ? -Math.cos(a) : Math.cos(a)) * tiltShiftY;
      const px = ex + rx + rz * skewX;
      const py = ey - ry + rz * elevY;

      const isFront = rz >= 0;
      if (frontOnly && !isFront) {
        started = false;
        continue;
      }
      if (!frontOnly && isFront) {
        started = false;
        continue;
      }
      if (!started) {
        ctx.moveTo(px, py);
        started = true;
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.stroke();
    ctx.restore();
  }

  function drawShadowCones(ctx, cones, occluder, W, unit, tDict) {
    ctx.save();

    // Penumbra Cone
    ctx.beginPath();
    ctx.moveTo(cones.bIntPlus.x, cones.bIntPlus.y);
    ctx.lineTo(cones.penFarTop.x, cones.penFarTop.y);
    ctx.lineTo(cones.penFarBot.x, cones.penFarBot.y);
    ctx.lineTo(cones.bIntMinus.x, cones.bIntMinus.y);
    ctx.closePath();
    const penGrad = ctx.createLinearGradient(
      occluder.x,
      occluder.y,
      occluder.x + W * 0.45,
      occluder.y
    );
    penGrad.addColorStop(0, "rgba(148, 163, 184, 0.22)");
    penGrad.addColorStop(1, "rgba(148, 163, 184, 0.03)");
    ctx.fillStyle = penGrad;
    ctx.fill();

    // Antumbra (beyond umbra apex)
    if (cones.apex.x < W) {
      ctx.beginPath();
      ctx.moveTo(cones.apex.x, cones.apex.y);
      ctx.lineTo(cones.antFarPlus.x, cones.antFarPlus.y);
      ctx.lineTo(cones.antFarMinus.x, cones.antFarMinus.y);
      ctx.closePath();
      ctx.fillStyle = "rgba(245, 158, 11, 0.13)";
      ctx.fill();
    }

    // Umbra Cone (darkest core)
    ctx.beginPath();
    ctx.moveTo(cones.bExtPlus.x, cones.bExtPlus.y);
    ctx.lineTo(cones.apex.x, cones.apex.y);
    ctx.lineTo(cones.bExtMinus.x, cones.bExtMinus.y);
    ctx.closePath();
    ctx.fillStyle = "rgba(2, 5, 14, 0.86)";
    ctx.fill();
    ctx.strokeStyle = "rgba(56, 189, 248, 0.42)";
    ctx.lineWidth = 1.1;
    ctx.stroke();

    // Tangent Light Rays
    if (state.showRays) {
      ctx.strokeStyle = "rgba(251, 191, 36, 0.28)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      const rays = [
        [cones.sExtPlus, cones.antFarPlus],
        [cones.sExtMinus, cones.antFarMinus],
        [cones.sIntPlus, cones.penFarBot],
        [cones.sIntMinus, cones.penFarTop]
      ];
      for (const [p1, p2] of rays) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
      ctx.setLineDash([]);
    }

    // Shadow Zone Labels
    if (state.showLabels) {
      ctx.font = `600 ${Math.max(10, Math.round(11 * unit))}px Inter, sans-serif`;
      ctx.textAlign = "center";

      const midUmbraX = Math.min(cones.apex.x - 18 * unit, occluder.x + (cones.apex.x - occluder.x) * 0.48);
      const midUmbraY = occluder.y + (cones.apex.y - occluder.y) * 0.48;
      if (midUmbraX > occluder.x + occluder.r + 16) {
        ctx.fillStyle = "rgba(186, 230, 253, 0.9)";
        ctx.fillText(tDict.umbra, midUmbraX, midUmbraY + 4);
      }

      const penLabelX = occluder.x + Math.min(130 * unit, W * 0.14);
      const penLabelY = occluder.y - occluder.r - 24 * unit;
      ctx.fillStyle = "rgba(203, 213, 225, 0.82)";
      ctx.fillText(tDict.penumbra, penLabelX, penLabelY);

      if (state.category === "solar" && cones.apex.x < W * 0.78) {
        ctx.fillStyle = "rgba(253, 230, 138, 0.88)";
        ctx.fillText(tDict.antumbra, Math.min(cones.apex.x + 56 * unit, W * 0.92), cones.apex.y - 12 * unit);
      }
    }

    ctx.restore();
  }

  function drawSpaceSun(ctx, x, y, r) {
    ctx.save();
    const glow = ctx.createRadialGradient(x, y, r * 0.8, x, y, r * 2.15);
    glow.addColorStop(0, "rgba(251, 191, 36, 0.55)");
    glow.addColorStop(0.45, "rgba(245, 158, 11, 0.16)");
    glow.addColorStop(1, "rgba(245, 158, 11, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, r * 2.15, 0, Math.PI * 2);
    ctx.fill();

    const bodyGrad = ctx.createRadialGradient(x - r * 0.25, y - r * 0.25, r * 0.1, x, y, r);
    bodyGrad.addColorStop(0, "#fef9c3");
    bodyGrad.addColorStop(0.55, "#fbbf24");
    bodyGrad.addColorStop(1, "#d97706");
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawSpaceEarth(ctx, x, y, r, astro) {
    ctx.save();
    // Atmospheric outer rim
    const atmo = ctx.createRadialGradient(x, y, r * 0.85, x, y, r * 1.24);
    atmo.addColorStop(0, "rgba(56, 189, 248, 0.45)");
    atmo.addColorStop(1, "rgba(56, 189, 248, 0)");
    ctx.fillStyle = atmo;
    ctx.beginPath();
    ctx.arc(x, y, r * 1.24, 0, Math.PI * 2);
    ctx.fill();

    // Clip Earth circle
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.clip();

    // Ocean gradient lit from left (Sun side)
    const ocean = ctx.createRadialGradient(x - r * 0.55, y, r * 0.15, x, y, r * 1.15);
    ocean.addColorStop(0, "#38bdf8");
    ocean.addColorStop(0.55, "#1d4ed8");
    ocean.addColorStop(1, "#081229");
    ctx.fillStyle = ocean;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);

    // Stylized continents on sunlit side
    ctx.fillStyle = "rgba(52, 211, 153, 0.55)";
    ctx.beginPath();
    ctx.ellipse(x - r * 0.22, y - r * 0.26, r * 0.28, r * 0.18, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x - r * 0.08, y + r * 0.28, r * 0.22, r * 0.26, 0.4, 0, Math.PI * 2);
    ctx.fill();

    // Night-side terminator shading (right half)
    const night = ctx.createLinearGradient(x - r * 0.1, y, x + r, y);
    night.addColorStop(0, "rgba(2, 6, 23, 0)");
    night.addColorStop(0.55, "rgba(2, 6, 23, 0.55)");
    night.addColorStop(1, "rgba(2, 6, 23, 0.92)");
    ctx.fillStyle = night;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);

    // Moving Solar Eclipse Shadow Spot on Earth's face!
    if (astro.mode === "solar" && astro.obscurationPct > 0.5) {
      const spotX = x - r * 0.55 + (astro.dxArcmin / 36) * r * 0.35;
      const spotY = y - (astro.dyArcmin / 60) * r * 0.85;
      const penR = r * 0.42;
      const penSpot = ctx.createRadialGradient(spotX, spotY, 1, spotX, spotY, penR);
      penSpot.addColorStop(0, "rgba(2, 6, 23, 0.88)");
      penSpot.addColorStop(0.35, "rgba(2, 6, 23, 0.42)");
      penSpot.addColorStop(1, "rgba(2, 6, 23, 0)");
      ctx.fillStyle = penSpot;
      ctx.beginPath();
      ctx.arc(spotX, spotY, penR, 0, Math.PI * 2);
      ctx.fill();

      if (astro.classificationKey === "solarTotal" || astro.classificationKey === "solarAnnular") {
        ctx.fillStyle =
          astro.classificationKey === "solarTotal"
            ? "#020617"
            : "rgba(245, 158, 11, 0.45)";
        ctx.beginPath();
        ctx.arc(spotX, spotY, r * 0.14, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }

  function drawSpaceMoon(ctx, x, y, r, astro, applyLunarEclipseTint) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.clip();

    // Base Moon shaded from Sun (left)
    const moonGrad = ctx.createRadialGradient(x - r * 0.48, y, r * 0.1, x, y, r * 1.15);
    moonGrad.addColorStop(0, "#f1f5f9");
    moonGrad.addColorStop(0.6, "#94a3b8");
    moonGrad.addColorStop(1, "#1e293b");
    ctx.fillStyle = moonGrad;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);

    // Subtle craters
    ctx.fillStyle = "rgba(51, 65, 85, 0.32)";
    ctx.beginPath();
    ctx.arc(x - r * 0.25, y - r * 0.25, r * 0.2, 0, Math.PI * 2);
    ctx.arc(x + r * 0.12, y + r * 0.22, r * 0.16, 0, Math.PI * 2);
    ctx.arc(x - r * 0.1, y + r * 0.36, r * 0.12, 0, Math.PI * 2);
    ctx.fill();

    // If inside Earth's shadow during Lunar Eclipse, apply matching darkening & Blood Moon copper tint
    if (applyLunarEclipseTint) {
      const penDim = Math.min(1, astro.penumbralCoveragePct / 100) * 0.28;
      const umbFactor = Math.min(1, astro.umbralCoveragePct / 100);
      if (penDim > 0.01) {
        ctx.fillStyle = `rgba(2, 6, 23, ${penDim.toFixed(3)})`;
        ctx.fillRect(x - r, y - r, r * 2, r * 2);
      }
      if (umbFactor > 0.01) {
        ctx.fillStyle = `rgba(185, 45, 18, ${(umbFactor * 0.72).toFixed(3)})`;
        ctx.fillRect(x - r, y - r, r * 2, r * 2);
      }
    }

    ctx.restore();
  }

  function drawBodyLabel(ctx, x, y, text, color) {
    ctx.save();
    ctx.font = "600 12px Inter, 'Noto Sans Kannada', sans-serif";
    ctx.textAlign = "center";
    ctx.fillStyle = color;
    ctx.shadowColor = "rgba(2, 6, 23, 0.9)";
    ctx.shadowBlur = 6;
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  // =========================================================================
  // 7. CANVAS RENDERING: OBSERVER SKY VIEW FROM EARTH
  // =========================================================================
  function drawSkyScene(astro) {
    const { ctx, width: W, height: H } = syncCanvasResolution(dom.skyCanvas);
    if (W < 10 || H < 10) return;

    const cx = W * 0.5;
    const cy = H * 0.5;
    const unitR = Math.min(W, H) * 0.21;

    if (astro.mode === "solar") {
      drawSolarSky(ctx, W, H, cx, cy, unitR, astro);
    } else {
      drawLunarSky(ctx, W, H, cx, cy, unitR, astro);
    }
  }

  function drawSolarSky(ctx, W, H, cx, cy, sunR, astro) {
    // 1. Dynamic sky brightness from bright blue day to deep totality twilight
    const d = astro.skyDarkness;
    const topR = Math.round(18 * (1 - d) + 5 * d);
    const topG = Math.round(78 * (1 - d) + 9 * d);
    const topB = Math.round(158 * (1 - d) + 25 * d);
    const botR = Math.round(56 * (1 - d) + 22 * d);
    const botG = Math.round(136 * (1 - d) + 26 * d);
    const botB = Math.round(212 * (1 - d) + 52 * d);

    const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
    skyGrad.addColorStop(0, `rgb(${topR}, ${topG}, ${topB})`);
    skyGrad.addColorStop(1, `rgb(${botR}, ${botG}, ${botB})`);
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, W, H);

    // Stars appear near totality
    if (d > 0.45) {
      const starVis = (d - 0.45) / 0.55;
      for (const s of skyStars) {
        ctx.fillStyle = `rgba(248, 250, 252, ${(s.alpha * starVis * 0.9).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r * 0.85, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const pxPerArcmin = sunR / astro.sunRadiusArcmin;
    const moonR = astro.moonRadiusArcmin * pxPerArcmin;
    const moonX = cx + astro.dxArcmin * pxPerArcmin;
    const moonY = cy - astro.dyArcmin * pxPerArcmin;

    // 2. Solar Corona (intensifies dramatically near totality)
    const coronaAlpha =
      astro.classificationKey === "solarTotal"
        ? 1
        : Math.max(0.18, Math.pow(astro.obscurationPct / 100, 3) * 0.9);

    ctx.save();
    const coronaGrad = ctx.createRadialGradient(cx, cy, sunR * 0.92, cx, cy, sunR * 2.45);
    coronaGrad.addColorStop(0, `rgba(255, 251, 235, ${(0.85 * coronaAlpha).toFixed(3)})`);
    coronaGrad.addColorStop(0.28, `rgba(253, 224, 71, ${(0.35 * coronaAlpha).toFixed(3)})`);
    coronaGrad.addColorStop(0.65, `rgba(147, 197, 253, ${(0.12 * coronaAlpha).toFixed(3)})`);
    coronaGrad.addColorStop(1, "rgba(2, 6, 23, 0)");
    ctx.fillStyle = coronaGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, sunR * 2.45, 0, Math.PI * 2);
    ctx.fill();

    // Animated radial corona streamers during high obscuration / totality
    if (astro.obscurationPct > 92) {
      const streamVis = Math.min(1, (astro.obscurationPct - 92) / 8);
      for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2 + Math.sin(state.timeSec * 0.4 + i) * 0.04;
        const len = sunR * (1.75 + 0.55 * ((i * 7) % 3) / 2);
        ctx.strokeStyle = `rgba(224, 242, 254, ${(0.18 * streamVis).toFixed(3)})`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * sunR * 0.96, cy + Math.sin(angle) * sunR * 0.96);
        ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
        ctx.stroke();
      }
    }
    ctx.restore();

    // 3. Solar Photosphere Disc
    const sunGrad = ctx.createRadialGradient(cx, cy, sunR * 0.1, cx, cy, sunR);
    sunGrad.addColorStop(0, "#ffffff");
    sunGrad.addColorStop(0.7, "#fef08a");
    sunGrad.addColorStop(0.96, "#fbbf24");
    sunGrad.addColorStop(1, "#f59e0b");
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, sunR, 0, Math.PI * 2);
    ctx.fill();

    // 4. Pink chromosphere prominences during totality
    if (astro.classificationKey === "solarTotal") {
      ctx.fillStyle = "rgba(244, 63, 94, 0.85)";
      const proms = [0.4, 2.5, 4.1];
      for (const a of proms) {
        ctx.beginPath();
        ctx.arc(
          cx + Math.cos(a) * (sunR + 1.5),
          cy + Math.sin(a) * (sunR + 1.5),
          3.5,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    }

    // 5. Dark Moon Silhouette
    const moonFill = ctx.createRadialGradient(
      moonX - moonR * 0.2,
      moonY - moonR * 0.2,
      moonR * 0.1,
      moonX,
      moonY,
      moonR
    );
    moonFill.addColorStop(0, "#0b1120");
    moonFill.addColorStop(1, "#02040a");
    ctx.fillStyle = moonFill;
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
    ctx.fill();

    // 6. Diamond Ring Flare just before/after Totality
    if (astro.skyPhaseKey === "diamondRing") {
      const edgeAngle = Math.atan2(cy - moonY, cx - moonX) + Math.PI;
      const fx = cx + Math.cos(edgeAngle) * sunR;
      const fy = cy + Math.sin(edgeAngle) * sunR;
      const flare = ctx.createRadialGradient(fx, fy, 1, fx, fy, sunR * 0.52);
      flare.addColorStop(0, "rgba(255, 255, 255, 1)");
      flare.addColorStop(0.2, "rgba(254, 240, 138, 0.85)");
      flare.addColorStop(1, "rgba(251, 191, 36, 0)");
      ctx.fillStyle = flare;
      ctx.beginPath();
      ctx.arc(fx, fy, sunR * 0.52, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawLunarSky(ctx, W, H, cx, cy, moonR, astro) {
    // 1. Deep night sky & stars
    const nightGrad = ctx.createLinearGradient(0, 0, 0, H);
    nightGrad.addColorStop(0, "#030612");
    nightGrad.addColorStop(1, "#091024");
    ctx.fillStyle = nightGrad;
    ctx.fillRect(0, 0, W, H);

    for (const s of skyStars) {
      const twinkle = 0.7 + 0.3 * Math.sin(state.timeSec * 1.4 + s.twinkleOffset);
      ctx.fillStyle = `rgba(226, 232, 240, ${(s.alpha * twinkle).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(s.x * W, s.y * H, s.r * 0.9, 0, Math.PI * 2);
      ctx.fill();
    }

    const pxPerArcmin = moonR / astro.moonRadiusArcmin;
    const umbraR = astro.umbraRadiusArcmin * pxPerArcmin;
    const penumbraR = astro.penumbraRadiusArcmin * pxPerArcmin;

    // Shadow center relative to Moon centered in Sky View
    const shadowX = cx - astro.dxArcmin * pxPerArcmin;
    const shadowY = cy + astro.dyArcmin * pxPerArcmin;

    // Subtle faint reference circles showing Earth's Penumbra & Umbra in the night sky
    ctx.save();
    ctx.strokeStyle = "rgba(148, 163, 184, 0.14)";
    ctx.setLineDash([4, 5]);
    ctx.beginPath();
    ctx.arc(shadowX, shadowY, penumbraR, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "rgba(239, 68, 68, 0.25)";
    ctx.beginPath();
    ctx.arc(shadowX, shadowY, umbraR, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // 2. Render Cratered Full Moon
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, moonR, 0, Math.PI * 2);
    ctx.clip();

    const moonBase = ctx.createRadialGradient(cx - moonR * 0.25, cy - moonR * 0.2, moonR * 0.1, cx, cy, moonR);
    moonBase.addColorStop(0, "#f8fafc");
    moonBase.addColorStop(0.7, "#cbd5e1");
    moonBase.addColorStop(1, "#94a3b8");
    ctx.fillStyle = moonBase;
    ctx.fillRect(cx - moonR, cy - moonR, moonR * 2, moonR * 2);

    // Lunar Maria & Craters
    const maria = [
      { x: -0.25, y: -0.22, rx: 0.28, ry: 0.22, a: 0.2 },
      { x: 0.22, y: -0.15, rx: 0.22, ry: 0.26, a: -0.3 },
      { x: -0.1, y: 0.26, rx: 0.24, ry: 0.16, a: 0.1 },
      { x: 0.3, y: 0.28, rx: 0.15, ry: 0.14, a: 0.4 }
    ];
    ctx.fillStyle = "rgba(71, 85, 105, 0.34)";
    for (const m of maria) {
      ctx.beginPath();
      ctx.ellipse(cx + m.x * moonR, cy + m.y * moonR, m.rx * moonR, m.ry * moonR, m.a, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Overlay Earth's Curved Penumbra Shading
    const penGrad = ctx.createRadialGradient(
      shadowX,
      shadowY,
      umbraR * 0.9,
      shadowX,
      shadowY,
      penumbraR
    );
    penGrad.addColorStop(0, "rgba(15, 23, 42, 0.55)");
    penGrad.addColorStop(1, "rgba(15, 23, 42, 0)");
    ctx.fillStyle = penGrad;
    ctx.beginPath();
    ctx.arc(shadowX, shadowY, penumbraR, 0, Math.PI * 2);
    ctx.fill();

    // 4. Overlay Earth's Curved Umbra & Copper-Red Atmospheric Refraction
    const umbGrad = ctx.createRadialGradient(
      shadowX,
      shadowY,
      umbraR * 0.15,
      shadowX,
      shadowY,
      umbraR * 1.03
    );
    umbGrad.addColorStop(0, "rgba(105, 22, 12, 0.88)");
    umbGrad.addColorStop(0.68, "rgba(185, 48, 18, 0.82)");
    umbGrad.addColorStop(0.94, "rgba(234, 88, 12, 0.62)");
    umbGrad.addColorStop(1, "rgba(15, 23, 42, 0)");
    ctx.fillStyle = umbGrad;
    ctx.beginPath();
    ctx.arc(shadowX, shadowY, umbraR * 1.03, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // =========================================================================
  // 8. UI SYNC, PHASES TIMELINE, LANGUAGE & QUIZ
  // =========================================================================
  function updateUI(astro) {
    const t = I18N[state.lang];

    // Status & Sky Phase Badges
    dom.statusBadge.textContent = t.classifications[astro.classificationKey];
    dom.statusBadge.className = "status-badge";
    if (astro.classificationKey.endsWith("None")) {
      dom.statusBadge.classList.add("status-none");
    } else if (astro.mode === "lunar") {
      dom.statusBadge.classList.add("status-lunar");
    }

    dom.skyPhaseBadge.textContent = t.skyPhase[astro.skyPhaseKey];
    dom.skyCaption.textContent = t.captions[astro.captionKey];

    // Telemetry Readouts
    dom.statObscurationLabel.textContent =
      astro.mode === "solar" ? t.statObscuration : t.statUmbralCover;
    const mainPct = astro.mode === "solar" ? astro.obscurationPct : astro.umbralCoveragePct;
    dom.statObscuration.textContent = `${mainPct.toFixed(1)}%`;

    dom.statShadowZone.textContent = t.labels[astro.shadowZoneKey];

    const moonDia = (astro.moonRadiusArcmin * 2).toFixed(1);
    const sunDia = (astro.sunRadiusArcmin * 2).toFixed(1);
    dom.statApparentSizes.textContent = `${moonDia}' / ${sunDia}'`;

    dom.statAlignment.textContent = `${state.tiltDeg >= 0 ? "+" : ""}${state.tiltDeg.toFixed(2)}°`;

    // Sliders & Value Labels
    dom.progressSlider.value = state.progress;
    dom.progressValue.textContent = `${Math.round(state.progress)}%`;

    dom.distanceSlider.value = state.moonDistKm;
    const kmUnit = state.lang === "kn" ? "ಕಿ.ಮೀ" : "km";
    dom.distanceValue.textContent = `${state.moonDistKm.toLocaleString("en-US")} ${kmUnit}`;

    dom.tiltSlider.value = state.tiltDeg;
    dom.tiltValue.textContent = `${state.tiltDeg >= 0 ? "+" : ""}${state.tiltDeg.toFixed(2)}°`;

    // Play/Pause Icon
    dom.playIcon.classList.toggle("hidden", state.playing);
    dom.pauseIcon.classList.toggle("hidden", !state.playing);
    dom.playPauseLabel.textContent = state.playing ? t.btnPause : t.btnPlay;

    // Highlight closest phase stage card
    const cards = dom.phaseCards.querySelectorAll(".phase-card");
    let closestIdx = 0;
    let minDiff = Infinity;
    const stages = PHASE_STAGES[state.category][state.lang];
    stages.forEach((stage, idx) => {
      const diff = Math.abs(state.progress - stage.progress);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    cards.forEach((card, idx) => {
      card.classList.toggle("active", idx === closestIdx && minDiff < 7);
    });
  }

  function renderPhaseCards() {
    const t = I18N[state.lang];
    dom.phasesHeading.textContent =
      state.category === "solar" ? t.phasesTitleSolar : t.phasesTitleLunar;

    const stages = PHASE_STAGES[state.category][state.lang];
    dom.phaseCards.innerHTML = "";
    stages.forEach((stage) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "phase-card";
      btn.innerHTML = `
        <div class="phase-card-top">
          <span class="phase-code">${stage.code}</span>
          <span class="phase-pct">${Math.round(stage.progress)}%</span>
        </div>
        <h3>${stage.title}</h3>
        <p>${stage.desc}</p>
      `;
      btn.addEventListener("click", () => {
        state.playing = false;
        state.progress = stage.progress;
        renderFrame();
      });
      dom.phaseCards.appendChild(btn);
    });
  }

  function applyLanguage(lang) {
    state.lang = lang;
    document.documentElement.lang = lang === "kn" ? "kn" : "en";
    const t = I18N[lang];

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (t[key]) {
        if (key.endsWith("Body")) {
          el.innerHTML = t[key];
        } else {
          el.textContent = t[key];
        }
      }
    });

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    renderPhaseCards();
    renderQuiz();
    renderFrame();
  }

  function applyPreset(presetKey) {
    const p = PRESETS[presetKey];
    if (!p) return;
    state.preset = presetKey;
    state.category = p.category;
    state.moonDistKm = p.moonDistKm;
    state.tiltDeg = p.tiltDeg;
    state.progress = p.progress;

    syncActiveButtons();
    renderPhaseCards();
    renderFrame();
  }

  function syncActiveButtons() {
    document.querySelectorAll(".category-pill").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.category === state.category);
    });
    document.querySelectorAll(".preset-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.preset === state.preset);
    });
  }

  function clearCustomPresetHighlight() {
    document.querySelectorAll(".preset-btn").forEach((btn) => btn.classList.remove("active"));
  }

  // Quiz Engine
  function renderQuiz() {
    const t = I18N[state.lang];
    const total = QUIZ_DATA.length;
    dom.quizScoreDisplay.textContent = `${state.quizScore} / ${total}`;

    if (state.quizDone) {
      dom.quizBody.classList.add("hidden");
      dom.quizSummary.classList.remove("hidden");
      dom.quizProgressBar.style.width = "100%";

      const pct = Math.round((state.quizScore / total) * 100);
      dom.summaryBadge.textContent = pct >= 80 ? "★" : pct >= 50 ? "◐" : "☾";
      dom.summaryTitle.textContent =
        state.lang === "kn"
          ? `ರಸಪ್ರಶ್ನೆ ಮುಗಿದಿದೆ! ಅಂಕ: ${state.quizScore} / ${total}`
          : `Quiz Complete! You scored ${state.quizScore} / ${total}`;
      dom.summaryText.textContent =
        state.lang === "kn"
          ? pct >= 80
            ? "ಅದ್ಭುತ! ಸೂರ್ಯ ಮತ್ತು ಚಂದ್ರಗ್ರಹಣಗಳ ಜ್ಯಾಮಿತಿ ಮತ್ತು ವಿಜ್ಞಾನವನ್ನು ನೀವು ಚೆನ್ನಾಗಿ ಅರ್ಥಮಾಡಿಕೊಂಡಿದ್ದೀರಿ."
            : "ಉತ್ತಮ ಪ್ರಯತ್ನ! ಸಿಮ್ಯುಲೇಟರ್ ಮತ್ತು ನೆರಳಿನ ಮಾರ್ಗದರ್ಶಿಯನ್ನು ಗಮನಿಸಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ."
          : pct >= 80
            ? "Stellar work! You have a strong command of eclipse geometry, shadow zones, and orbital mechanics."
            : "Good effort! Experiment with the Perigee/Apogee and Tilt sliders above, then try again.";
      return;
    }

    dom.quizBody.classList.remove("hidden");
    dom.quizSummary.classList.add("hidden");

    const item = QUIZ_DATA[state.quizIndex][state.lang];
    dom.quizProgressBar.style.width = `${((state.quizIndex + 1) / total) * 100}%`;
    dom.quizCounter.textContent =
      state.lang === "kn"
        ? `ಪ್ರಶ್ನೆ ${state.quizIndex + 1} / ${total}`
        : `Question ${state.quizIndex + 1} of ${total}`;
    dom.quizQuestion.textContent = item.q;

    dom.quizOptions.innerHTML = "";
    dom.quizFeedback.className = "quiz-feedback hidden";
    dom.quizFeedback.textContent = "";
    dom.quizNextBtn.classList.add("hidden");

    const letters = ["A", "B", "C", "D"];
    item.options.forEach((optText, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz-option";
      btn.innerHTML = `<span class="option-letter">${letters[idx]}</span><span>${optText}</span>`;
      btn.addEventListener("click", () => handleQuizAnswer(idx));
      dom.quizOptions.appendChild(btn);
    });

    if (state.quizAnswered && state.quizSelected !== null) {
      applyQuizFeedback(state.quizSelected);
    }

    dom.quizNextBtn.textContent =
      state.quizIndex === total - 1 ? t.quizFinish : t.quizNext;
  }

  function applyQuizFeedback(selectedIdx) {
    const item = QUIZ_DATA[state.quizIndex][state.lang];
    const isCorrect = selectedIdx === item.answer;
    const optionBtns = dom.quizOptions.querySelectorAll(".quiz-option");
    optionBtns.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === item.answer) btn.classList.add("correct");
      else if (idx === selectedIdx && !isCorrect) btn.classList.add("wrong");
    });

    dom.quizScoreDisplay.textContent = `${state.quizScore} / ${QUIZ_DATA.length}`;
    dom.quizFeedback.textContent = item.exp;
    dom.quizFeedback.className = `quiz-feedback ${isCorrect ? "is-correct" : "is-wrong"}`;
    dom.quizNextBtn.classList.remove("hidden");
  }

  function handleQuizAnswer(selectedIdx) {
    if (state.quizAnswered) return;
    state.quizAnswered = true;
    state.quizSelected = selectedIdx;

    const item = QUIZ_DATA[state.quizIndex][state.lang];
    if (selectedIdx === item.answer) state.quizScore += 1;
    applyQuizFeedback(selectedIdx);
  }

  // =========================================================================
  // 9. EVENT LISTENERS & ANIMATION LOOP
  // =========================================================================
  function bindEvents() {
    // Language Switcher
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
    });

    // Category Pills (Solar / Lunar)
    document.querySelectorAll(".category-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        const cat = btn.dataset.category;
        applyPreset(cat === "solar" ? "solar-total" : "lunar-total");
      });
    });

    // Presets & Demo Buttons
    document.querySelectorAll(".preset-btn, .demo-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        applyPreset(btn.dataset.preset);
        if (btn.classList.contains("demo-btn")) {
          document.getElementById("simulator").scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    // Playback Controls
    dom.playPauseBtn.addEventListener("click", () => {
      state.playing = !state.playing;
      renderFrame();
    });

    dom.resetBtn.addEventListener("click", () => {
      applyPreset(state.preset || "solar-total");
    });

    document.querySelectorAll(".speed-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.speed = parseFloat(btn.dataset.speed);
        document.querySelectorAll(".speed-btn").forEach((b) => {
          b.classList.toggle("active", b === btn);
        });
      });
    });

    // Sliders
    dom.progressSlider.addEventListener("input", (e) => {
      state.playing = false;
      state.progress = parseFloat(e.target.value);
      renderFrame();
    });

    dom.distanceSlider.addEventListener("input", (e) => {
      state.moonDistKm = parseInt(e.target.value, 10);
      clearCustomPresetHighlight();
      renderFrame();
    });

    dom.tiltSlider.addEventListener("input", (e) => {
      state.tiltDeg = parseFloat(e.target.value);
      clearCustomPresetHighlight();
      renderFrame();
    });

    dom.snapNodeBtn.addEventListener("click", () => {
      state.tiltDeg = 0;
      clearCustomPresetHighlight();
      renderFrame();
    });

    // Visual Toggles
    dom.toggleLabels.addEventListener("change", (e) => {
      state.showLabels = e.target.checked;
      renderFrame();
    });
    dom.toggleRays.addEventListener("change", (e) => {
      state.showRays = e.target.checked;
      renderFrame();
    });
    dom.toggleOrbit.addEventListener("change", (e) => {
      state.showOrbit = e.target.checked;
      renderFrame();
    });

    // Pointer Dragging directly on Space Canvas to scrub timeline
    const scrubFromPointer = (clientX) => {
      const rect = dom.spaceCanvas.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      state.progress = ratio * 100;
      renderFrame();
    };

    dom.spaceCanvas.addEventListener("pointerdown", (e) => {
      state.isDragging = true;
      state.playing = false;
      dom.spaceCanvas.setPointerCapture(e.pointerId);
      scrubFromPointer(e.clientX);
    });

    dom.spaceCanvas.addEventListener("pointermove", (e) => {
      if (!state.isDragging) return;
      scrubFromPointer(e.clientX);
    });

    const endDrag = () => {
      state.isDragging = false;
    };
    dom.spaceCanvas.addEventListener("pointerup", endDrag);
    dom.spaceCanvas.addEventListener("pointercancel", endDrag);

    // Quiz Buttons
    dom.quizNextBtn.addEventListener("click", () => {
      state.quizAnswered = false;
      state.quizSelected = null;
      if (state.quizIndex < QUIZ_DATA.length - 1) {
        state.quizIndex += 1;
      } else {
        state.quizDone = true;
      }
      renderQuiz();
    });

    dom.quizRestartBtn.addEventListener("click", () => {
      state.quizIndex = 0;
      state.quizScore = 0;
      state.quizAnswered = false;
      state.quizSelected = null;
      state.quizDone = false;
      renderQuiz();
    });

    // Keyboard Shortcuts
    window.addEventListener("keydown", (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") {
        if (e.code === "ArrowLeft" || e.code === "ArrowRight") return;
      }
      if (tag === "BUTTON" && e.code === "Space") return;
      if (e.code === "Space") {
        e.preventDefault();
        state.playing = !state.playing;
        renderFrame();
      } else if (e.code === "ArrowRight") {
        state.playing = false;
        state.progress = Math.min(100, state.progress + 1.5);
        renderFrame();
      } else if (e.code === "ArrowLeft") {
        state.playing = false;
        state.progress = Math.max(0, state.progress - 1.5);
        renderFrame();
      }
    });

    window.addEventListener("resize", () => renderFrame());
  }

  function renderFrame() {
    const astro = computeAstronomy();
    drawSpaceScene(astro);
    drawSkyScene(astro);
    updateUI(astro);
  }

  function tick(timestamp) {
    if (!state.lastFrameTime) state.lastFrameTime = timestamp;
    const dt = Math.min(0.05, (timestamp - state.lastFrameTime) / 1000);
    state.lastFrameTime = timestamp;
    state.timeSec += dt;

    if (state.playing && !state.isDragging) {
      // Gentle pause/slow-mo feeling near peak eclipse (progress ~50%)
      const distFromPeak = Math.abs(state.progress - 50) / 50;
      const slowFactor = 0.45 + 0.55 * distFromPeak;
      state.progress += dt * 11 * state.speed * slowFactor;
      if (state.progress > 100) state.progress = 0;
    }

    renderFrame();
    requestAnimationFrame(tick);
  }

  // =========================================================================
  // 10. INITIALIZATION
  // =========================================================================
  function init() {
    bindEvents();
    renderPhaseCards();
    renderQuiz();
    applyPreset("solar-total");
    requestAnimationFrame(tick);
  }

  init();
})();
