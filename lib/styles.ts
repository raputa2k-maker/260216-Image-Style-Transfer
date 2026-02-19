import { StyleOption } from "@/types";

// 20가지 아트 스타일 정의
export const STYLES: StyleOption[] = [
    {
        id: 1,
        name: "수채화",
        nameEn: "watercolor",
        emoji: "🎨",
        prompt:
            "Transform this photo into a watercolor painting style. Apply soft, translucent brush strokes with gentle color blending and natural paper texture. Preserve the original composition, subject, and layout exactly.",
    },
    {
        id: 2,
        name: "유화",
        nameEn: "oil-painting",
        emoji: "🖼️",
        prompt:
            "Transform this photo into an oil painting style with rich textures, visible thick brushstrokes, vivid color contrasts, and painterly depth. Keep the original composition and subject intact.",
    },
    {
        id: 3,
        name: "연필 스케치",
        nameEn: "pencil-sketch",
        emoji: "✏️",
        prompt:
            "Transform this photo into a detailed pencil sketch drawing with fine graphite lines, cross-hatching shading, and clean white paper background. Maintain the original form and proportions.",
    },
    {
        id: 4,
        name: "일본 애니메",
        nameEn: "anime",
        emoji: "🌸",
        prompt:
            "Transform this photo into Japanese anime style with bold outlines, cel-shaded coloring, large expressive eyes for characters, vibrant colors, and clean line art. Keep the original pose and composition.",
    },
    {
        id: 5,
        name: "스튜디오 지브리",
        nameEn: "ghibli",
        emoji: "🏔️",
        prompt:
            "Transform this photo into Studio Ghibli animation style with soft pastel colors, whimsical hand-drawn details, dreamy lighting, and warm atmospheric backgrounds. Preserve the original scene layout.",
    },
    {
        id: 6,
        name: "팝 아트",
        nameEn: "pop-art",
        emoji: "🎭",
        prompt:
            "Transform this photo into Pop Art style inspired by Andy Warhol and Roy Lichtenstein. Use bold primary colors, strong black outlines, Ben-Day dots pattern, and high contrast. Keep the original subject.",
    },
    {
        id: 7,
        name: "만화/코믹북",
        nameEn: "comic-book",
        emoji: "💥",
        prompt:
            "Transform this photo into a comic book / cartoon style with bold ink outlines, flat vibrant color fills, halftone dot shading, and dynamic comic panel look. Preserve the original composition.",
    },
    {
        id: 8,
        name: "픽셀 아트",
        nameEn: "pixel-art",
        emoji: "👾",
        prompt:
            "Transform this photo into retro pixel art style with a visible pixel grid, limited color palette, and blocky 16-bit aesthetic. Maintain recognizable shapes and the original composition.",
    },
    {
        id: 9,
        name: "3D 클레이/점토",
        nameEn: "clay-3d",
        emoji: "🧸",
        prompt:
            "Transform this photo into a 3D claymation / clay figurine style with soft rounded shapes, matte clay textures, subtle fingerprint details, and warm studio lighting. Keep the original scene.",
    },
    {
        id: 10,
        name: "사이버펑크",
        nameEn: "cyberpunk",
        emoji: "🌃",
        prompt:
            "Transform this photo into a cyberpunk aesthetic with neon glow effects, dark moody atmosphere, rain-slicked surfaces, holographic highlights, and futuristic electric blue and magenta tones. Preserve the original scene.",
    },
    {
        id: 11,
        name: "인상파 (모네 스타일)",
        nameEn: "impressionist",
        emoji: "🌻",
        prompt:
            "Transform this photo into an Impressionist painting style inspired by Claude Monet, with visible loose brushstrokes, emphasis on light and color, soft edges, and a luminous atmosphere. Keep the original composition.",
    },
    {
        id: 12,
        name: "우키요에 (일본 목판화)",
        nameEn: "ukiyo-e",
        emoji: "🗾",
        prompt:
            "Transform this photo into Japanese Ukiyo-e woodblock print style with flat areas of color, strong black outlines, flowing curved lines, and traditional Japanese artistic composition. Preserve the subject.",
    },
    {
        id: 13,
        name: "캐리커처",
        nameEn: "caricature",
        emoji: "😄",
        prompt:
            "Transform this photo into a caricature style with exaggerated facial features, humorous proportions, and expressive cartoon-like rendering while keeping the subject recognizable.",
    },
    {
        id: 14,
        name: "베이퍼웨이브",
        nameEn: "vaporwave",
        emoji: "🌅",
        prompt:
            "Transform this photo into a vaporwave aesthetic with pastel pink/purple/cyan colors, retro 80s-90s digital artifacts, glitch effects, sunset gradients, and nostalgic surreal atmosphere. Preserve the composition.",
    },
    {
        id: 15,
        name: "고딕/다크 판타지",
        nameEn: "dark-gothic",
        emoji: "🏰",
        prompt:
            "Transform this photo into a dark Gothic fantasy style with dramatic shadows, deep rich colors, ornate Victorian details, mysterious atmosphere, and moody dark lighting. Keep the original scene.",
    },
    {
        id: 16,
        name: "미니멀 라인 드로잉",
        nameEn: "line-drawing",
        emoji: "🖊️",
        prompt:
            "Transform this photo into a Korean modern line illustration style. Convert all people into elegantly proportioned illustrated characters with: tall slender bodies (8+ head-to-body ratio, fashion illustration proportions), thin clean black ink outlines with consistent line weight throughout. FACE DETAILS ARE CRITICAL — draw faces exactly like this: eyes as either tiny small dots OR short slightly thick curved arch lines depending on expression (smiling = short arch curves, neutral = small dots), eyebrows as short thick natural curved strokes clearly separated above the eyes, nose as an extremely minimal tiny curved line or short flick (almost like a small comma), mouth as a very short simple curved smile line. Faces should be warm flat beige/peach skin tone with NO blush, NO shading, and NO additional facial details. Hair should be rendered as solid dark colored shapes with minimal internal detail and natural volume. Clothing must preserve the original outfit's style, colors, layering, and silhouette accurately — draw fabric folds and drapes using clean line work only, with flat muted pastel coloring (soft beige, dusty pink, olive, cream tones) and absolutely NO gradients, NO shadows, and NO shading fills. Hands should be simplified but naturally posed. The background should be a clean plain off-white or very light cream color — completely remove the original background. The overall color palette must be warm, muted, and soft — avoid any saturated or bright colors. The style should look like a high-quality Korean portrait illustration (한국 감성 일러스트) with an elegant, warm, and minimal aesthetic. Preserve the original photo's composition, poses, and relative positioning of all subjects.",
    },
    {
        id: 17,
        name: "레고 스타일",
        nameEn: "lego",
        emoji: "🧱",
        prompt:
            "Transform this photo into LEGO brick style, making everything look like it's built from LEGO blocks and minifigures, with plastic-like textures and blocky geometric shapes. Keep the scene recognizable.",
    },
    {
        id: 18,
        name: "스누피 스타일",
        nameEn: "peanuts",
        emoji: "🐶",
        prompt:
            "Transform this photo into the art style of Charles Schulz's Peanuts comic strip. Convert all people into Peanuts-style characters with: large round heads proportionally bigger than their bodies, simple dot eyes or small oval eyes, tiny round noses shown as a small curve, simple wide curved line mouths, short stubby bodies with minimal detail, thin black ink outlines with a slightly wobbly hand-drawn quality. Hair should be simplified into solid blocked shapes. Clothing should be simplified but retain the original outfit's colors and general style, rendered with flat solid colors and no gradients or shading. IMPORTANT: Preserve the original photo's background scene, environment, and setting as much as possible — redraw the background in Peanuts comic style while keeping the same locations, objects, structures, and spatial layout from the original photo. Do not replace the background with a blank or generic scene. Use a soft, muted pastel color palette consistent with the Peanuts aesthetic. The overall feel should look like an authentic Peanuts comic panel drawn by Charles Schulz. Preserve the original photo's composition, subject positions, and relative positioning of all people.",
    },
    {
        id: 19,
        name: "아르누보",
        nameEn: "art-nouveau",
        emoji: "🌿",
        prompt:
            "Transform this photo into Art Nouveau style with elegant flowing organic lines, floral and botanical decorative elements, ornate borders, muted earthy color palette, and Alphonse Mucha-inspired composition. Keep the subject.",
    },
    {
        id: 20,
        name: "GTA 게임 스타일",
        nameEn: "gta-style",
        emoji: "🎮",
        prompt:
            "Transform this photo into GTA (Grand Theft Auto) loading screen art style with bold cinematic colors, dramatic shadows, slightly exaggerated features, saturated tones, and a stylized realistic look. Preserve the composition.",
    },
    {
        id: 21,
        name: "9종 표정 세트",
        nameEn: "9-expressions-grid",
        emoji: "📸",
        prompt:
            "Using the uploaded photo as reference for the person's appearance (face, hair, body type), generate a single image containing a 3x3 grid of 9 portraits of this exact same person. Each cell should show a different pose and facial expression. The 9 variations should include: (1) smiling with arms crossed, (2) laughing with head tilted, (3) chin resting on hand thoughtfully, (4) covering mouth while giggling, (5) making a peace sign, (6) hands on hips confidently, (7) surprised expression with open mouth, (8) hands touching hair playfully, (9) calm neutral expression looking straight ahead. All 9 portraits must maintain the exact same person identity — same face, same hairstyle, same hair color, same clothing outfit throughout all cells. Keep the same plain light gray background in every cell. Each cell should be evenly sized and separated by thin white borders. The style should be photorealistic studio portrait photography with soft natural lighting. The output should be one single combined image with all 9 portraits arranged in a clean 3x3 grid layout.",
    },
];
