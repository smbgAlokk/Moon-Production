import { useCallback, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Camera, Film, Headphones, Image as ImageIcon, Moon, SunMedium, UploadCloud, Wand2 } from "lucide-react";

type MediaKind = "image" | "video" | "audio";

type MediaAsset = {
	url: string;
	kind: MediaKind;
	title?: string;
};

const gradientBorder = "relative p-[1px] rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500";
const surfaceCard = "rounded-2xl bg-neutral-800/80 backdrop-blur-md shadow-lg";

const defaultImageSeeds = ["studio1", "studio2", "studio3", "studio4", "studio5", "studio6"];
const aiImageUrls = defaultImageSeeds.map((seed) => `https://picsum.photos/seed/${seed}/1200/800`);

const aiVideoUrls = [
	"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
	"https://www.w3schools.com/html/mov_bbb.mp4"
];

const aiAudioUrls = [
	"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
	"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
	"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
];

const CreativeStudioPage = () => {
	const [isDark, setIsDark] = useState<boolean>(true);
	const [isGenerating, setIsGenerating] = useState<boolean>(false);

	const [images, setImages] = useState<string[]>(aiImageUrls.slice(0, 6));
	const [videos, setVideos] = useState<string[]>(aiVideoUrls.slice(0, 2));
	const [audios, setAudios] = useState<string[]>(aiAudioUrls.slice(0, 3));

	const imageInputRef = useRef<HTMLInputElement>(null);
	const videoInputRef = useRef<HTMLInputElement>(null);
	const audioInputRef = useRef<HTMLInputElement>(null);

	const allAssets: MediaAsset[] = useMemo(() => {
		return [
			...images.map((url, i) => ({ url, kind: "image" as const, title: `AI Image ${i + 1}` })),
			...videos.map((url, i) => ({ url, kind: "video" as const, title: `AI Video ${i + 1}` })),
			...audios.map((url, i) => ({ url, kind: "audio" as const, title: `AI Audio ${i + 1}` }))
		];
	}, [images, videos, audios]);

	const handleToggleTheme = useCallback(() => {
		setIsDark((prev) => !prev);
	}, []);

	const handleGenerate = useCallback(async () => {
		setIsGenerating(true);
		// Simulate AI generation latency
		await new Promise((r) => setTimeout(r, 900));
		// Shuffle seeds lightly to simulate uniqueness
		const nextImages = defaultImageSeeds
			.map((seed, idx) => `https://picsum.photos/seed/${seed}-${Date.now() % (idx + 7)}/1200/800`)
			.slice(0, 6);
		const nextVideos = [...aiVideoUrls].reverse();
		const nextAudios = [...aiAudioUrls];
		setImages(nextImages);
		setVideos(nextVideos);
		setAudios(nextAudios);
		setIsGenerating(false);
	}, []);

	const handleFiles = useCallback((files: FileList | null, kind: MediaKind) => {
		if (!files || files.length === 0) return;
		const urls = Array.from(files).map((f) => URL.createObjectURL(f));
		if (kind === "image") setImages((prev) => [...urls, ...prev].slice(0, 12));
		if (kind === "video") setVideos((prev) => [...urls, ...prev].slice(0, 6));
		if (kind === "audio") setAudios((prev) => [...urls, ...prev].slice(0, 10));
	}, []);

	const pageBg = isDark ? "bg-neutral-900 text-neutral-100" : "bg-white text-neutral-900";
	const surfaceBg = isDark ? "bg-neutral-800/80" : "bg-slate-100/80";
	const mutedText = isDark ? "text-neutral-400" : "text-neutral-600";

	return (
		<div className={`${pageBg} min-h-screen relative`}> 
			{/* Decorative gradient wash */}
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.25),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.2),transparent_60%)]" />

			{/* Top bar */}
			<header className="relative z-10 border-b border-white/10">
				<div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="h-10 w-10 rounded-xl bg-white/5 backdrop-blur-md flex items-center justify-center ring-1 ring-white/10">
							<Camera className="h-5 w-5 text-neutral-200" />
						</div>
						<div>
							<div className="font-semibold tracking-wide">Creative Studio</div>
							<div className={`text-xs ${mutedText}`}>Premium AI Media Workspace</div>
						</div>
					</div>
					<div className="flex items-center gap-3">
						<Button variant="outline" className="rounded-xl border-white/20 bg-white/5 text-neutral-100 hover:scale-105 hover:shadow-xl transition-all">
							<Badge className="mr-2 rounded-full bg-white/10 text-neutral-200 border-white/20" variant="outline">Beta</Badge>
							Studio v1.0
						</Button>
						<Button onClick={handleToggleTheme} variant="outline" className="rounded-xl border-white/20 bg-white/5 text-neutral-100 hover:scale-105 hover:shadow-xl transition-all">
							{isDark ? <SunMedium className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
							{isDark ? "Light" : "Dark"}
						</Button>
					</div>
				</div>
			</header>

			<main className="relative z-10 mx-auto max-w-7xl px-6 py-12">
				{/* Hero */}
				<section className="mb-12">
					<div className="text-center max-w-3xl mx-auto">
						<h1 className="text-4xl md:text-6xl font-bold tracking-tight">
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">Design the Future</span>
							<br />
							<span className="text-neutral-100">of Your Creative Studio</span>
						</h1>
						<p className={`mt-4 text-lg ${mutedText}`}>
							A premium, elegant, and futuristic workspace for media — powered by AI. Layered dark surfaces, subtle glass, and vibrant accents.
						</p>
						<div className="mt-8 flex flex-wrap items-center justify-center gap-4">
							<Button onClick={handleGenerate} disabled={isGenerating} className="rounded-2xl px-6 py-6 text-base font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white">
								<Wand2 className="h-5 w-5 mr-2" /> {isGenerating ? "Generating..." : "Generate My Website"}
							</Button>
							<Popover>
								<PopoverTrigger asChild>
									<Button variant="outline" className="rounded-2xl px-6 py-6 text-base font-semibold border-white/20 bg-white/5 text-neutral-100 hover:scale-105 hover:shadow-xl transition-all">
										<UploadCloud className="h-5 w-5 mr-2" /> Add My Media
									</Button>
								</PopoverTrigger>
								<PopoverContent align="center" className={`w-72 ${surfaceBg} border-white/10 text-neutral-100`}> 
									<div className="space-y-3">
										<div className="text-sm font-medium">Upload or replace assets</div>
										<div className={`text-xs ${mutedText}`}>Files remain local until you publish.</div>
										<div className="grid grid-cols-3 gap-2 pt-1">
											<Button onClick={() => imageInputRef.current?.click()} className="rounded-xl bg-white/5 hover:bg-white/10">
												<ImageIcon className="h-4 w-4 mr-2" /> Images
											</Button>
											<Button onClick={() => videoInputRef.current?.click()} className="rounded-xl bg-white/5 hover:bg-white/10">
												<Film className="h-4 w-4 mr-2" /> Videos
											</Button>
											<Button onClick={() => audioInputRef.current?.click()} className="rounded-xl bg-white/5 hover:bg-white/10">
												<Headphones className="h-4 w-4 mr-2" /> Audio
											</Button>
										</div>
									</div>
								</PopoverContent>
							</Popover>
							<input ref={imageInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files, "image")} />
							<input ref={videoInputRef} type="file" accept="video/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files, "video")} />
							<input ref={audioInputRef} type="file" accept="audio/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files, "audio")} />
						</div>
					</div>
				</section>

				{/* Video Previews */}
				<section className="space-y-4 mb-12">
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-semibold tracking-wide">🎥 Video previews</h2>
						<span className={`text-sm ${mutedText}`}>{videos.length} items</span>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{videos.map((src, idx) => (
							<div key={src} className={`${gradientBorder} hover:scale-[1.01] hover:shadow-xl transition-all`}>
								<Card className={`${surfaceCard} overflow-hidden`}>
									<CardContent className="p-0">
										<div className="relative">
											<video controls src={src} className="w-full aspect-video" />
											<span className="absolute left-3 top-3 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-white/10 backdrop-blur text-neutral-100 border border-white/20">AI Placeholder</span>
										</div>
										<div className="p-4 flex items-center justify-between">
											<div className="font-medium">AI Video {idx + 1}</div>
											<Button size="sm" variant="outline" className="rounded-xl border-white/20 bg-white/5 hover:bg-white/10" onClick={() => videoInputRef.current?.click()}>
												Replace
											</Button>
										</div>
									</CardContent>
								</Card>
							</div>
						))}
					</div>
				</section>

				{/* Image Gallery */}
				<section className="space-y-4 mb-12">
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-semibold tracking-wide">🖼️ Image gallery</h2>
						<span className={`text-sm ${mutedText}`}>{images.length} items</span>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
						{images.map((src, idx) => (
							<div key={src} className={`${gradientBorder} hover:scale-[1.02] hover:shadow-xl transition-all`}>
								<div className={`${surfaceCard} overflow-hidden`}>
									<div className="relative">
										<img src={src} alt={`AI Image ${idx + 1}`} className="w-full aspect-[4/3] object-cover transition-all duration-300 hover:scale-105" />
										<span className="absolute left-3 top-3 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-white/10 backdrop-blur text-neutral-100 border border-white/20">AI Placeholder</span>
										<Button size="sm" variant="outline" className="absolute right-3 top-3 rounded-xl border-white/20 bg-white/5 hover:bg-white/10" onClick={() => imageInputRef.current?.click()}>
											Replace
										</Button>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Audio Samples */}
				<section className="space-y-4">
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-semibold tracking-wide">🎵 Audio samples</h2>
						<span className={`text-sm ${mutedText}`}>{audios.length} items</span>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{audios.map((src, idx) => (
							<div key={src} className={`${gradientBorder} hover:scale-[1.01] hover:shadow-xl transition-all`}>
								<Card className={`${surfaceCard} overflow-hidden`}>
									<CardContent className="p-0">
										<div className="p-4 flex items-center gap-3 border-b border-white/10">
											<Headphones className="h-4 w-4 text-neutral-200" />
											<div className="font-medium">AI Audio {idx + 1}</div>
											<span className={`ml-auto text-xs ${mutedText}`}>Placeholder</span>
										</div>
										<div className="p-4">
											<audio controls src={src} className="w-full" />
											<div className="mt-3 flex items-center justify-between">
												<Button size="sm" variant="outline" className="rounded-xl border-white/20 bg-white/5 hover:bg-white/10" onClick={() => audioInputRef.current?.click()}>
													Replace
												</Button>
												<div className={`text-xs ${mutedText}`}>Royalty-free preview</div>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						))}
					</div>
				</section>
			</main>

			{/* Subtle glass footer */}
			<footer className="relative z-10 mt-16 border-t border-white/10">
				<div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
					<div className={`text-sm ${mutedText}`}>© {new Date().getFullYear()} Creative Studio. All rights reserved.</div>
					<div className="flex items-center gap-2 text-xs">
						<Film className="h-3 w-3" />
						<Camera className="h-3 w-3" />
						<Headphones className="h-3 w-3" />
					</div>
				</div>
			</footer>
		</div>
	);
};

export default CreativeStudioPage;


