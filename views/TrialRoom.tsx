
import React, { useState, useRef } from 'react';
import { Product, ViewMode } from '../types';
import { Camera, X, Maximize2, RotateCcw, ChevronLeft, ChevronRight, Settings, Download, Sparkles, Loader2 } from 'lucide-react';

interface TrialRoomProps {
    products: Product[];
    onNavigate: (view: ViewMode) => void;
}

const TrialRoom: React.FC<TrialRoomProps> = ({ products, onNavigate }) => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
    const [useCamera, setUseCamera] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [transform, setTransform] = useState({
        x: 0,
        y: 0,
        scale: 0.8,
        rotate: 0,
        tilt: 0
    });
    const [isPlacementConfirmed, setIsPlacementConfirmed] = useState(false);
    const [isPanelVisible, setIsPanelVisible] = useState(true);
    const [isCapturing, setIsCapturing] = useState(false);

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            setStream(mediaStream);
            setUseCamera(true);
        } catch (err) {
            console.error('Kamera erişim hatası:', err);
            alert('Kamera erişimi reddedildi veya mevcut değil.');
        }
    };

    React.useEffect(() => {
        if (useCamera && stream && videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    }, [useCamera, stream]);

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        setUseCamera(false);
    };

    const capturePhoto = async () => {
        if (!previewContainerRef.current) return;

        setIsCapturing(true);
        // Temporarily hide UI elements for a clean photo
        const originalPanelState = isPanelVisible;
        setIsPanelVisible(false);

        try {
            // Wait for UI to update
            await new Promise(resolve => setTimeout(resolve, 100));

            const html2canvas = (await import('html2canvas')).default;
            const canvas = await html2canvas(previewContainerRef.current, {
                useCORS: true,
                allowTaint: true,
                backgroundColor: null,
                scale: 2
            });

            const imageData = canvas.toDataURL('image/jpeg', 0.9);
            setBackgroundImage(imageData);
            stopCamera();
            setIsPlacementConfirmed(false);
        } catch (error) {
            console.error('Capture error:', error);
            alert('Fotoğraf çekilemedi.');
        } finally {
            setIsCapturing(false);
            setIsPanelVisible(originalPanelState);
        }
    };


    const resetRoom = () => {
        setBackgroundImage(null);
        setSelectedProduct(null);
        setIsPlacementConfirmed(false);
        stopCamera();
    };

    const previewContainerRef = useRef<HTMLDivElement>(null);

    const downloadScreenshot = async () => {
        if (!previewContainerRef.current || !selectedProduct || !backgroundImage) {
            alert('Lütfen önce bir ürün ve arka plan seçin!');
            return;
        }

        try {
            // Temporarily hide the control panel for clean screenshot
            const originalPanelState = isPanelVisible;
            setIsPanelVisible(false);

            // Wait for UI to update
            await new Promise(resolve => setTimeout(resolve, 100));

            // Use html2canvas to capture the preview
            const html2canvas = (await import('html2canvas')).default;
            const canvas = await html2canvas(previewContainerRef.current, {
                useCORS: true,
                allowTaint: true,
                backgroundColor: null,
                scale: 2 // Higher quality
            });

            // Convert to blob and download
            canvas.toBlob((blob) => {
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `avyna-deneme-${Date.now()}.png`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                }
            });

            // Restore panel state
            setIsPanelVisible(originalPanelState);
        } catch (error) {
            console.error('Screenshot error:', error);
            alert('Görsel kaydedilemedi. Lütfen tekrar deneyin.');
        }
    };


    return (
        <div className="min-h-screen bg-white dark:bg-black pb-24">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-black/5 dark:border-white/5 px-4 md:px-6 py-3 md:py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
                    <button
                        onClick={() => onNavigate(ViewMode.HOME)}
                        className="flex items-center gap-1 md:gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                    >
                        <ChevronLeft size={14} className="md:w-4 md:h-4" />
                        <span className="hidden sm:inline">GERİ DÖN</span>
                    </button>
                    <h1 className="text-lg md:text-2xl font-black uppercase tracking-tighter">Deneme Odası</h1>
                    <div className="flex items-center gap-2 md:gap-3">
                        {!useCamera && !backgroundImage && (
                            <button
                                onClick={startCamera}
                                className="flex items-center gap-1 md:gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-orange-600 hover:text-black dark:hover:text-white transition-colors"
                            >
                                <Camera size={14} className="md:w-4 md:h-4" />
                                <span className="hidden sm:inline">KAMERAYI AÇ</span>
                            </button>
                        )}
                        {backgroundImage && selectedProduct && (
                            <button
                                onClick={downloadScreenshot}
                                className="flex items-center gap-1 md:gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest bg-orange-600 text-white px-3 md:px-4 py-2 md:py-2.5 hover:bg-black transition-all"
                                title="Görseli İndir"
                            >
                                <Download size={14} className="md:w-4 md:h-4" />
                                <span className="hidden sm:inline">İNDİR</span>
                            </button>
                        )}
                        <button
                            onClick={resetRoom}
                            className="flex items-center gap-1 md:gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-orange-600 hover:text-black dark:hover:text-white transition-colors"
                        >
                            <RotateCcw size={14} className="md:w-4 md:h-4" />
                            <span className="hidden sm:inline">SIFIRLA</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">
                    {/* AR Preview Area */}
                    <div className="lg:col-span-2 space-y-4 md:space-y-6">
                        <div
                            ref={previewContainerRef}
                            className="relative aspect-[4/3] md:aspect-[4/3] bg-gray-50 dark:bg-surface-dark border-2 border-dashed border-black/10 dark:border-white/10 overflow-hidden"
                        >
                            {(useCamera || backgroundImage) ? (
                                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                                    {useCamera ? (
                                        <video
                                            ref={videoRef}
                                            autoPlay
                                            playsInline
                                            muted
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <img src={backgroundImage!} alt="Room" className="w-full h-full object-cover" />
                                    )}

                                    {selectedProduct && (
                                        <div className="absolute inset-0 pointer-events-none">
                                            {/* Model Viewer Container with transformation */}
                                            <div
                                                className="absolute inset-0 pointer-events-auto"
                                                style={{
                                                    transform: `scale(${transform.scale}) rotate(${transform.rotate}deg) translate(${transform.x}px, ${transform.y}px)`,
                                                    transition: 'transform 0.1s ease-out'
                                                }}
                                            >
                                                <model-viewer
                                                    src={selectedProduct.modelUrl}
                                                    alt={selectedProduct.name}
                                                    camera-controls
                                                    interaction-prompt="none"
                                                    camera-orbit={`0deg ${75 + transform.tilt}deg auto`}
                                                    ar
                                                    ar-modes="webxr scene-viewer quick-look"
                                                    style={{ width: '100%', height: '100%' }}
                                                />
                                            </div>

                                            {/* Placement Controls Overlay */}
                                            <div className={`absolute bottom-4 left-4 right-4 md:top-1/2 md:right-4 md:left-auto md:bottom-auto md:-translate-y-1/2 pointer-events-auto bg-black/40 backdrop-blur-xl p-3 md:p-4 border border-white/10 md:space-y-6 md:w-36 rounded-xl md:rounded-2xl shadow-2xl transition-all duration-300 ${isPanelVisible ? 'translate-x-0 opacity-100' : 'md:translate-x-[calc(100%+1rem)] translate-y-[calc(100%+1rem)] md:translate-y-0 opacity-0 pointer-events-none'
                                                }`}>
                                                <div className="flex justify-between items-center mb-2 md:mb-2">
                                                    <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.2em] text-white/40">Düzenle</span>
                                                    <button
                                                        onClick={() => setTransform({ x: 0, y: 0, scale: 0.8, rotate: 0, tilt: 0 })}
                                                        className="text-white/40 hover:text-orange-500 transition-colors"
                                                    >
                                                        <RotateCcw size={10} className="md:w-3 md:h-3" />
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:space-y-5 md:block">
                                                    <div className="space-y-1 md:space-y-2">
                                                        <div className="flex justify-between items-center">
                                                            <label className="text-[6px] md:text-[7px] uppercase font-bold text-white/50 tracking-widest">Ölçek</label>
                                                            <span className="text-[6px] md:text-[7px] font-mono text-orange-500">%{Math.round(transform.scale * 100)}</span>
                                                        </div>
                                                        <input
                                                            type="range" min="0.1" max="1.5" step="0.05"
                                                            value={transform.scale}
                                                            onChange={e => setTransform(prev => ({ ...prev, scale: parseFloat(e.target.value) }))}
                                                            className="w-full h-[2px] bg-white/10 rounded-full appearance-none cursor-pointer accent-orange-600"
                                                        />
                                                    </div>

                                                    <div className="space-y-1 md:space-y-2">
                                                        <div className="flex justify-between items-center">
                                                            <label className="text-[6px] md:text-[7px] uppercase font-bold text-white/50 tracking-widest">Eğim</label>
                                                            <span className="text-[6px] md:text-[7px] font-mono text-orange-500">{transform.tilt}°</span>
                                                        </div>
                                                        <input
                                                            type="range" min="-75" max="15" step="1"
                                                            value={transform.tilt}
                                                            onChange={e => setTransform(prev => ({ ...prev, tilt: parseInt(e.target.value) }))}
                                                            className="w-full h-[2px] bg-white/10 rounded-full appearance-none cursor-pointer accent-orange-600"
                                                        />
                                                    </div>

                                                    <div className="space-y-1 md:space-y-2">
                                                        <div className="flex justify-between items-center">
                                                            <label className="text-[6px] md:text-[7px] uppercase font-bold text-white/50 tracking-widest">Açı</label>
                                                            <span className="text-[6px] md:text-[7px] font-mono text-orange-500">{transform.rotate}°</span>
                                                        </div>
                                                        <input
                                                            type="range" min="0" max="360" step="1"
                                                            value={transform.rotate}
                                                            onChange={e => setTransform(prev => ({ ...prev, rotate: parseInt(e.target.value) }))}
                                                            className="w-full h-[2px] bg-white/10 rounded-full appearance-none cursor-pointer accent-orange-600"
                                                        />
                                                    </div>

                                                    <div className="space-y-1 md:space-y-2">
                                                        <div className="flex justify-between items-center">
                                                            <label className="text-[6px] md:text-[7px] uppercase font-bold text-white/50 tracking-widest">Dikey (Y)</label>
                                                        </div>
                                                        <input
                                                            type="range" min="-400" max="400"
                                                            value={transform.y}
                                                            onChange={e => setTransform(prev => ({ ...prev, y: parseInt(e.target.value) }))}
                                                            className="w-full h-[2px] bg-white/10 rounded-full appearance-none cursor-pointer accent-orange-600"
                                                        />
                                                    </div>

                                                    <div className="space-y-1 md:space-y-2">
                                                        <div className="flex justify-between items-center">
                                                            <label className="text-[6px] md:text-[7px] uppercase font-bold text-white/50 tracking-widest">Yatay (X)</label>
                                                        </div>
                                                        <input
                                                            type="range" min="-400" max="400"
                                                            value={transform.x}
                                                            onChange={e => setTransform(prev => ({ ...prev, x: parseInt(e.target.value) }))}
                                                            className="w-full h-[2px] bg-white/10 rounded-full appearance-none cursor-pointer accent-orange-600"
                                                        />
                                                    </div>

                                                    <button
                                                        onClick={() => setTransform(prev => ({ ...prev, tilt: prev.tilt === 15 ? 0 : 15 }))}
                                                        className={`col-span-2 md:col-span-1 w-full py-2 md:py-2.5 rounded-lg text-[6px] md:text-[7px] font-black uppercase tracking-widest transition-all duration-300 border ${transform.tilt === 15
                                                            ? 'bg-orange-600 border-orange-500 text-white shadow-lg shadow-orange-600/20'
                                                            : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:text-white'
                                                            }`}
                                                    >
                                                        Üst Bakış
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Main Action Buttons */}
                                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 pointer-events-auto">
                                                {useCamera && !isPlacementConfirmed && (
                                                    <button
                                                        onClick={() => setIsPlacementConfirmed(true)}
                                                        className="bg-green-600 text-white px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl flex items-center gap-3"
                                                    >
                                                        TAMAM
                                                    </button>
                                                )}

                                                {useCamera && isPlacementConfirmed && (
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={() => setIsPlacementConfirmed(false)}
                                                            className="bg-black/50 backdrop-blur-md text-white px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all"
                                                        >
                                                            DÜZENLE
                                                        </button>
                                                        <button
                                                            onClick={capturePhoto}
                                                            disabled={isCapturing}
                                                            className="bg-orange-600 text-white px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl flex items-center gap-3 animate-pulse"
                                                        >
                                                            {isCapturing ? <Loader2 className="animate-spin" size={18} /> : <Camera size={18} />}
                                                            FOTOĞRAF ÇEK
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Close/Toggle Controls */}
                                            {useCamera && (
                                                <button
                                                    onClick={stopCamera}
                                                    className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black transition-all pointer-events-auto"
                                                    title="Kamerayı Kapat"
                                                >
                                                    <X size={20} />
                                                </button>
                                            )}

                                            <button
                                                onClick={() => setIsPanelVisible(!isPanelVisible)}
                                                className="absolute bottom-4 right-4 md:top-1/2 md:-translate-y-1/2 md:bottom-auto pointer-events-auto bg-orange-600 hover:bg-orange-700 text-white p-2.5 md:p-3 rounded-full shadow-2xl transition-all duration-300 border-2 border-white/20 z-10"
                                                title={isPanelVisible ? "Kontrol panelini gizle" : "Kontrol panelini göster"}
                                            >
                                                {isPanelVisible ? <ChevronRight size={16} className="md:w-5 md:h-5" /> : <Settings size={16} className="md:w-5 md:h-5" />}
                                            </button>
                                        </div>
                                    )}

                                    {useCamera && !selectedProduct && (
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <p className="bg-black/40 backdrop-blur-md text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                                                Lütfen bir ürün seçin
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full p-6 md:p-12 text-center">
                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-orange-600/10 text-orange-600 rounded-full flex items-center justify-center mb-6 md:mb-8">
                                        <Camera size={32} className="md:w-10 md:h-10" />
                                    </div>
                                    <h3 className="text-xl md:text-3xl font-black uppercase tracking-tighter mb-4 italic">Odanızı Hazırlayın</h3>
                                    <p className="text-[10px] md:text-[12px] text-gray-400 font-bold uppercase tracking-widest mb-8 md:mb-12 max-w-sm">
                                        Mobilyalarımızı kendi alanınızda görmek için kameranızı açın.
                                    </p>

                                    <div className="w-full max-w-xs">
                                        <button
                                            onClick={startCamera}
                                            className="group relative overflow-hidden bg-orange-600 text-white w-full py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-black shadow-2xl shadow-orange-600/20"
                                        >
                                            <div className="relative z-10 flex items-center justify-center gap-3">
                                                <Camera size={18} />
                                                KAMERAYI AÇ
                                            </div>
                                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                        </button>
                                    </div>

                                    <div className="mt-12 flex items-center justify-center gap-8 text-[8px] font-black uppercase tracking-widest text-gray-300">
                                        <span className="flex items-center gap-2"><Sparkles size={12} /> GERÇEKÇİ ÖLÇEKLENDİRME</span>
                                        <span className="flex items-center gap-2"><Maximize2 size={12} /> 3D YERLEŞTİRME</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {backgroundImage && !selectedProduct && (
                            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                                    ℹ️ Şimdi sağ taraftan bir ürün seçin ve odanızda nasıl göründüğünü görün!
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Product Selection */}
                    <div className="lg:col-span-1 space-y-4 md:space-y-6">
                        <div className="lg:sticky lg:top-32">
                            <h3 className="text-xs md:text-sm font-black uppercase tracking-widest mb-4 md:mb-6 border-b border-black/5 dark:border-white/5 pb-3 md:pb-4">
                                Ürün Seçin
                            </h3>
                            <div className="space-y-3 md:space-y-4 max-h-[400px] md:max-h-[600px] overflow-y-auto pr-2">
                                {products.map((product) => (
                                    <div
                                        key={product.id}
                                        onClick={() => setSelectedProduct(product)}
                                        className={`group cursor-pointer border-2 transition-all p-2 md:p-3 ${selectedProduct?.id === product.id
                                            ? 'border-orange-600 bg-orange-50 dark:bg-orange-900/20'
                                            : 'border-black/5 dark:border-white/5 hover:border-orange-600'
                                            }`}
                                    >
                                        <div className="flex gap-3 md:gap-4">
                                            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 dark:bg-surface-dark overflow-hidden shrink-0">
                                                <img
                                                    src={product.images?.[0] || ''}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                                                />
                                            </div>
                                            <div className="flex-grow">
                                                <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-tight mb-1">
                                                    {product.name}
                                                </h4>
                                                <p className="text-[8px] md:text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1 md:mb-2">
                                                    {product.category}
                                                </p>
                                                <p className="text-xs md:text-sm font-black text-orange-600">
                                                    ₺{product.price.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hidden canvas for camera capture */}
            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
};

export default TrialRoom;
