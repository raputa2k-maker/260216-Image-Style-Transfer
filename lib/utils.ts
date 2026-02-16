// 지원하는 이미지 형식
const SUPPORTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
// 최대 파일 크기 (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;
// 리사이즈 최대 크기 (긴 변 기준)
const MAX_DIMENSION = 1024;

/**
 * 파일 유효성 검사
 * @returns 에러 메시지 (유효하면 null)
 */
export function validateFile(file: File): string | null {
    if (!SUPPORTED_TYPES.includes(file.type)) {
        return "지원하지 않는 파일 형식입니다. JPG, PNG, WEBP 파일만 업로드해주세요.";
    }
    if (file.size > MAX_FILE_SIZE) {
        return "파일 크기가 10MB를 초과합니다. 더 작은 파일을 선택해주세요.";
    }
    return null;
}

/**
 * 이미지를 리사이즈하고 base64로 변환
 * 긴 변이 MAX_DIMENSION (1024px) 이하가 되도록 축소
 */
export async function resizeAndConvertToBase64(
    file: File
): Promise<{ base64: string; mimeType: string; preview: string }> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                let { width, height } = img;

                // 긴 변이 MAX_DIMENSION을 초과하면 비율 유지하며 축소
                if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
                    const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
                    width = Math.round(width * ratio);
                    height = Math.round(height * ratio);
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    reject(new Error("Canvas context 생성 실패"));
                    return;
                }

                ctx.drawImage(img, 0, 0, width, height);

                // base64 데이터 URL 생성
                const mimeType = file.type;
                const dataUrl = canvas.toDataURL(mimeType, 0.9);
                // data:image/jpeg;base64, 이후의 순수 base64 데이터 추출
                const base64 = dataUrl.split(",")[1];

                resolve({
                    base64,
                    mimeType,
                    preview: dataUrl,
                });
            };
            img.onerror = () => reject(new Error("이미지 로드 실패"));
            img.src = e.target?.result as string;
        };
        reader.onerror = () => reject(new Error("파일 읽기 실패"));
        reader.readAsDataURL(file);
    });
}

/**
 * PNG base64 이미지를 JPG로 변환 후 다운로드
 * @param imageSrc - data:image/png;base64,... 형태의 이미지 소스
 * @param styleName - 영문 스타일 이름 (파일명에 사용)
 */
export async function downloadAsJpg(
    imageSrc: string,
    styleName: string
): Promise<void> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
                reject(new Error("Canvas context 생성 실패"));
                return;
            }

            // JPG는 투명 배경을 지원하지 않으므로 흰색 배경 채우기
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);

            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        reject(new Error("Blob 변환 실패"));
                        return;
                    }
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `${styleName}_${Math.floor(Date.now() / 1000)}.jpg`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    resolve();
                },
                "image/jpeg",
                0.92 // JPG 품질 (0~1, 0.92 = 고품질)
            );
        };
        img.onerror = () => reject(new Error("이미지 로드 실패"));
        img.src = imageSrc;
    });
}
