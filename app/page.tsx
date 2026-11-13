'use client';

import { useEffect, useRef, useState } from 'react';

const flowerMessages = [
  'Kamu adalah hal indah yang selalu aku syukuri setiap hari. 💗',
  'Terima kasih sudah hadir dan mewarnai hidupku. 🌷',
  'Semoga kita selalu punya alasan untuk tersenyum bersama. 🌸',
  'Aku berharap masih ada banyak cerita indah bersama kamu. 💕',
  'Bunga ini kecil, tapi rasa sayangku jauh lebih besar. 🌹',
];

const flowers = ['🌷', '🌸', '🌹', '🌻', '🌺'];

const flowerPositions = [
  { left: '50%', top: '3%' },
  { left: '27%', top: '22%' },
  { left: '72%', top: '22%' },
  { left: '38%', top: '43%' },
  { left: '63%', top: '43%' },
];

const songs = [
  { name: 'Pretty 💗', src: '/pretty.mp3' },
  { name: 'Our Song 1 🎵', src: '/song1.mp3' },
  { name: 'Our Song 2 🎶', src: '/song2.mp3' },
  { name: 'Our Song 3 💕', src: '/song3.mp3' },
];

export default function Home() {
  const [slide, setSlide] = useState(1);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [opening, setOpening] = useState(false);
  const [opened, setOpened] = useState(false);

  const [selectedFlower, setSelectedFlower] = useState<number | null>(null);
  const [selectedSong, setSelectedSong] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  const [activeMemory, setActiveMemory] = useState(0);
  const [expandedMemory, setExpandedMemory] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const touchStartX = useRef<number | null>(null);

  const lidRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);
  const sparkle1Ref = useRef<HTMLSpanElement>(null);
  const sparkle2Ref = useRef<HTMLSpanElement>(null);

  // Coba putar musik saat website pertama kali dibuka
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.play()
      .then(() => {
        setPlaying(true);
        setAutoplayBlocked(false);
      })
      .catch(() => {
        setPlaying(false);
        setAutoplayBlocked(true);
      });
  }, []);

  function addPin(number: string) {
    if (password.length >= 6) return;

    const nextPassword = password + number;
    setPassword(nextPassword);
    setError('');

    if (nextPassword.length === 6) {
      if (nextPassword === '131125') {
        setTimeout(() => setSlide(2), 250);
      } else {
        setTimeout(() => {
          setPassword('');
          setError('Password-nya belum benar, coba lagi yaa 💗');
        }, 350);
      }
    }
  }

  function deletePin() {
    setPassword((current) => current.slice(0, -1));
    setError('');
  }

  async function openGift() {
    if (opening || opened) return;

    if (
      !lidRef.current ||
      !glowRef.current ||
      !heartRef.current ||
      !sparkle1Ref.current ||
      !sparkle2Ref.current
    ) return;

    setOpening(true);

    const lidAnimation = lidRef.current.animate(
      [
        { transform: 'translateX(-50%) translateY(0) rotate(0deg)', opacity: 1 },
        { transform: 'translateX(-50%) translateY(-45px) rotate(-12deg)', opacity: 1, offset: 0.5 },
        { transform: 'translateX(-50%) translateY(-115px) rotate(-28deg)', opacity: 0 },
      ],
      { duration: 1400, easing: 'cubic-bezier(.2,.8,.3,1)', fill: 'forwards' }
    );

    const glowAnimation = glowRef.current.animate(
      [
        { opacity: 0, transform: 'translateX(-50%) scale(.2)' },
        { opacity: 1, transform: 'translateX(-50%) scale(1.5)', offset: 0.6 },
        { opacity: 0, transform: 'translateX(-50%) scale(2)' },
      ],
      { duration: 1700, easing: 'ease-out', fill: 'forwards' }
    );

    const heartAnimation = heartRef.current.animate(
      [
        { opacity: 0, transform: 'translateX(-50%) translateY(20px) scale(.4)' },
        { opacity: 1, transform: 'translateX(-50%) translateY(-75px) scale(1.4)', offset: 0.55 },
        { opacity: 0, transform: 'translateX(-50%) translateY(-130px) scale(1)' },
      ],
      { duration: 1600, easing: 'ease-out', fill: 'forwards' }
    );

    const sparkle1Animation = sparkle1Ref.current.animate(
      [
        { opacity: 0, transform: 'scale(.3) rotate(0deg)' },
        { opacity: 1, transform: 'scale(1.6) rotate(30deg)' },
        { opacity: 0, transform: 'scale(.5) rotate(60deg)' },
      ],
      { duration: 1200, iterations: 2, easing: 'ease-in-out' }
    );

    const sparkle2Animation = sparkle2Ref.current.animate(
      [
        { opacity: 0, transform: 'scale(.3) rotate(0deg)' },
        { opacity: 1, transform: 'scale(1.6) rotate(-30deg)' },
        { opacity: 0, transform: 'scale(.5) rotate(-60deg)' },
      ],
      { duration: 1200, iterations: 2, easing: 'ease-in-out' }
    );

    await Promise.all([
      lidAnimation.finished,
      glowAnimation.finished,
      heartAnimation.finished,
      sparkle1Animation.finished,
      sparkle2Animation.finished,
    ]);

    setOpening(false);
    setOpened(true);
  }

  async function changeSong(index: number) {
    setSelectedSong(index);

    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.src = songs[index].src;
    audio.load();

    try {
      await audio.play();
      setPlaying(true);
      setAutoplayBlocked(false);
    } catch {
      setPlaying(false);
      setAutoplayBlocked(true);
    }
  }

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
        setAutoplayBlocked(false);
      } catch {
        setPlaying(false);
        setAutoplayBlocked(true);
      }
    }
  }

  function nextMemory() {
    setActiveMemory((current) => (current + 1) % 5);
  }

  function previousMemory() {
    setActiveMemory((current) => (current + 4) % 5);
  }

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null) return;

    const difference = e.changedTouches[0].clientX - touchStartX.current;

    if (difference < -35) nextMemory();
    if (difference > 35) previousMemory();

    touchStartX.current = null;
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-pink-100 via-rose-50 to-pink-200 text-rose-900">

      {/* MUSIK WEBSITE */}
      <audio
        ref={audioRef}
        src={songs[0].src}
        loop
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="hidden"
      />

      {/* TOMBOL MUSIK KECIL */}
      <button
        onClick={toggleMusic}
        className="fixed right-4 top-4 z-40 rounded-full border border-pink-200 bg-white/90 px-4 py-2 text-sm font-semibold text-rose-600 shadow-lg backdrop-blur"
      >
        {playing ? '♫ Music On' : '▶ Play Music'}
      </button>

      {/* SLIDE 1 - PIN PASSWORD */}
      {slide === 1 && (
        <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <div className="mb-5 animate-float text-7xl">💌</div>

          <h1 className="text-3xl font-bold">
            A Little Surprise
          </h1>

          <p className="mb-8 mt-3 text-rose-700">
            Masukkan kode rahasia kita 💗
          </p>

          {/* TITIK PIN */}
          <div className="mb-8 flex justify-center gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className={`h-4 w-4 rounded-full border-2 border-rose-400 transition-all ${
                  password.length > index
                    ? 'scale-110 bg-rose-400'
                    : 'bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* KEYPAD */}
          <div className="grid w-full max-w-xs grid-cols-3 gap-3">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '⌫', '0', '♥'].map((number) => (
              <button
                key={number}
                onClick={() => {
                  if (number === '⌫') {
                    deletePin();
                  } else if (number === '♥') {
                    if (password.length === 6) {
                      if (password === '131125') {
                        setSlide(2);
                      } else {
                        setPassword('');
                        setError('Password-nya salah, coba lagi yaa 💗');
                      }
                    }
                  } else {
                    addPin(number);
                  }
                }}
                className="flex h-16 items-center justify-center rounded-2xl border border-pink-200 bg-white/80 text-2xl font-semibold text-rose-500 shadow-md transition active:scale-90 hover:bg-pink-200"
              >
                {number}
              </button>
            ))}
          </div>

          {error && (
            <p className="mt-5 text-sm text-red-500">{error}</p>
          )}

          <p className="mt-7 text-xs text-rose-500">
            A little secret, just for us 💕
          </p>

          {autoplayBlocked && (
            <p className="mt-3 text-xs text-rose-500">
              Tekan Play Music untuk mendengarkan lagu 💗
            </p>
          )}
        </section>
      )}

      {/* SLIDE 2 - GIFT */}
      {slide === 2 && (
        <section className="flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 text-center">

          {!opened ? (
            <div className="animate-fade-in">
              <p className="mb-3 text-lg">
                Ada sesuatu untuk kamuuu 🎁
              </p>

              <button
                onClick={openGift}
                disabled={opening}
                aria-label="Buka kotak hadiah"
                className="relative mt-8 h-64 w-72"
              >
                <div
                  ref={glowRef}
                  className="absolute bottom-12 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, white 0%, #f9a8d4 40%, transparent 75%)',
                    opacity: 0,
                  }}
                />

                <div className="absolute bottom-8 left-1/2 z-10 h-36 w-52 -translate-x-1/2 rounded-b-2xl border-4 border-pink-400 bg-gradient-to-br from-pink-300 to-rose-500 shadow-xl">
                  <div className="absolute left-1/2 h-full w-9 -translate-x-1/2 bg-pink-100" />

                  <div
                    ref={heartRef}
                    className="absolute left-1/2 top-0 -translate-x-1/2 text-5xl"
                    style={{ opacity: 0 }}
                  >
                    💖
                  </div>
                </div>

                <div
                  ref={lidRef}
                  className="absolute bottom-[164px] left-1/2 z-20 h-12 w-56 -translate-x-1/2 rounded-xl border-4 border-pink-400 bg-gradient-to-r from-pink-300 via-pink-100 to-rose-400 shadow-lg"
                >
                  <div className="absolute left-1/2 h-full w-9 -translate-x-1/2 bg-white/70" />
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-6xl">
                    🎀
                  </div>
                </div>

                <span
                  ref={sparkle1Ref}
                  className="absolute bottom-20 left-6 z-30 text-3xl"
                  style={{ opacity: 0 }}
                >
                  ✨
                </span>

                <span
                  ref={sparkle2Ref}
                  className="absolute bottom-36 right-8 z-30 text-3xl"
                  style={{ opacity: 0 }}
                >
                  ✨
                </span>
              </button>

              <p className="mt-3 text-sm text-rose-600">
                {opening
                  ? 'Hadiah spesial untuk kamuuu... 💗'
                  : 'Klik kotak hadiahnya yaa!'}
              </p>
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className="animate-heartbeat text-8xl">💝</div>
              <div className="mt-5 text-3xl">✨ 💗 ✨</div>

              <h1 className="mt-6 text-3xl font-bold">
                Happy Anniversary Sayangg💕💕
              </h1>

              <p className="mt-4">
                Ada banyak hal yang ingin aku ceritakan...
              </p>

              <button
                onClick={() => setSlide(3)}
                className="mt-8 rounded-full bg-rose-400 px-8 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
              >
                Continue 💗
              </button>
            </div>
          )}
        </section>
      )}

      {/* SLIDE 3 - MAIN CONTENT */}
      {slide === 3 && (
        <section className="mx-auto max-w-2xl px-5 py-12">

          {/* HEADER */}
          <div className="mb-16 text-center">
            <div className="mb-4 animate-float text-6xl">💗</div>

            <h1 className="text-3xl font-bold">
              Happy Anniversary Sayangg💕💕
            </h1>

            <p className="mt-3 text-sm text-rose-600">
              A special little website, made just for you.
            </p>
          </div>

          {/* LETTER */}
          <article className="animate-fade-in rounded-3xl border border-pink-200 bg-white/75 p-6 leading-8 shadow-lg">
            <h2 className="mb-5 text-center text-xl font-bold">
              Untuk Sayangku 💌
            </h2>

            Hai sayanggg, happy anniversary yaaa! 💕

            <br /><br />

            Aku cuma mau bilang terima kasih karena sudah menjadi bagian dari cerita hidupku. Terima kasih untuk setiap waktu, perhatian, cerita, dan hal-hal sederhana yang membuat hari-hariku terasa lebih berwarna.

            <br /><br />

            Aku tahu perjalanan kita tidak selalu sempurna. Tapi aku berharap kita bisa terus belajar memahami satu sama lain, saling mendukung, dan menciptakan lebih banyak kenangan indah.

            <br /><br />

            Semoga hari ini menjadi salah satu dari banyak hari bahagia yang akan kita rayakan bersama. Aku berharap kita masih punya banyak cerita yang bisa dikenang di masa depan.

            <br /><br />

            I love youuu, sayanggg! 💗
          </article>

          {/* DIGITAL FLOWER - BOUQUET */}
          <div className="my-24 text-center">
            <div className="mb-3 text-5xl">💐</div>

            <h2 className="text-2xl font-bold">
              Digital Flower
            </h2>

            <p className="mb-5 mt-2 text-sm text-rose-600">
              Buket kecil yang punya banyak pesan untuk kamu 🌷
            </p>

            <div className="bouquet-scene relative mx-auto h-80 w-full max-w-xs">
              {/* DAUN */}
              <div className="bouquet-leaf leaf-one" />
              <div className="bouquet-leaf leaf-two" />
              <div className="bouquet-leaf leaf-three" />

              {/* TANGKAI */}
              {flowers.map((_, index) => (
                <div
                  key={`stem-${index}`}
                  className="bouquet-stem"
                  style={{
                    left: flowerPositions[index].left,
                    top: `calc(${flowerPositions[index].top} + 35px)`,
                    transform: `rotate(${(index - 2) * 7}deg)`,
                  }}
                />
              ))}

              {/* BUNGA YANG BISA DIKLIK */}
              {flowers.map((flower, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedFlower(index)}
                  className={`bouquet-flower absolute z-20 -translate-x-1/2 text-5xl ${
                    selectedFlower === index ? 'flower-selected' : ''
                  }`}
                  style={{
                    left: flowerPositions[index].left,
                    top: flowerPositions[index].top,
                  }}
                  aria-label={`Bunga ${index + 1}`}
                >
                  {flower}
                </button>
              ))}

              {/* KERTAS PEMBUNGKUS */}
              <div className="bouquet-wrapper" />
              <div className="bouquet-ribbon">🎀</div>
            </div>

            <p className="mt-1 text-xs text-rose-500">
              Sentuh salah satu bunga untuk membaca pesannya 💗
            </p>

            {selectedFlower !== null && (
              <div
                key={selectedFlower}
                className="flower-message mt-7 rounded-2xl border border-pink-200 bg-white/85 p-6 shadow-lg"
              >
                <div className="mb-3 text-5xl">
                  {flowers[selectedFlower]}
                </div>

                <p className="leading-7">
                  {flowerMessages[selectedFlower]}
                </p>
              </div>
            )}
          </div>

          {/* OUR MEMORIES - POLAROID STACK */}
          <div className="my-24 text-center">
            <div className="mb-3 text-5xl">📸</div>

            <h2 className="text-2xl font-bold">
              Our Memories
            </h2>

            <p className="mb-7 mt-2 text-sm text-rose-600">
              Five little pieces of our story 💗
            </p>

            {/* AREA FOTO BERTUMPUK */}
            <div
              className="memory-stage relative mx-auto h-80 w-full max-w-sm touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {Array.from({ length: 5 }).map((_, index) => {
                const position = (index - activeMemory + 5) % 5;

                return (
                  <button
                    key={index}
                    onClick={() => {
                      if (position !== 0) {
                        setActiveMemory(index);
                      } else {
                        setExpandedMemory(index);
                      }
                    }}
                    className={`memory-card absolute left-1/2 top-1/2 w-52 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-3 pb-7 shadow-xl ${
                      position === 0 ? 'memory-front' : ''
                    }`}
                    style={{
                      zIndex: 10 - position,
                      transform: `translate(-50%, -50%) translate(${position * 7}px, ${position * 5}px) rotate(${(position - 2) * 5}deg) scale(${1 - position * 0.055})`,
                      opacity: 1 - position * 0.09,
                    }}
                  >
                    <div className="flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 to-rose-200">
                      <div className="text-center">
                        <div className="text-5xl">📷</div>
                        <p className="mt-2 text-xs text-rose-500">
                          Memory {index + 1}
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 text-sm font-medium text-rose-800">
                      Our Memory ♡
                    </p>
                  </button>
                );
              })}
            </div>

            {/* NAVIGASI MEMORIES */}
            <div className="mt-4 flex items-center justify-center gap-7">
              <button
                onClick={previousMemory}
                className="rounded-full bg-white px-5 py-3 text-xl text-rose-500 shadow-md active:scale-90"
              >
                ←
              </button>

              <span className="text-sm font-semibold text-rose-600">
                {activeMemory + 1} / 5
              </span>

              <button
                onClick={nextMemory}
                className="rounded-full bg-white px-5 py-3 text-xl text-rose-500 shadow-md active:scale-90"
              >
                →
              </button>
            </div>

            <p className="mt-4 text-xs text-rose-500">
              Geser tumpukan foto atau tekan foto paling depan 💕
            </p>
          </div>

          {/* FOTO DIPERBESAR */}
          {expandedMemory !== null && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5"
              onClick={() => setExpandedMemory(null)}
            >
              <div
                className="w-full max-w-sm rounded-2xl bg-white p-4 text-center shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex aspect-square items-center justify-center rounded-xl bg-gradient-to-br from-pink-100 to-rose-200">
                  <div>
                    <div className="text-7xl">📷</div>
                    <p className="mt-3 text-rose-600">
                      Memory {expandedMemory + 1}
                    </p>
                  </div>
                </div>

                <p className="my-4 font-semibold">
                  Our Little Memory 💗
                </p>

                <button
                  onClick={() => setExpandedMemory(null)}
                  className="rounded-full bg-rose-400 px-8 py-2 font-semibold text-white"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* MUSIC PLAYLIST */}
          <div className="my-20 rounded-3xl border border-pink-200 bg-white/75 p-6 text-center shadow-lg">
            <div className="mb-4 text-5xl">🎧</div>

            <h2 className="text-2xl font-bold">
              Our Little Playlist
            </h2>

            <p className="mb-7 mt-2 text-sm text-rose-600">
              Lagu-lagu yang menemani cerita kita 💗
            </p>

            <div className="space-y-3">
              {songs.map((item, index) => (
                <button
                  key={index}
                  onClick={() => changeSong(index)}
                  className={`w-full rounded-xl p-4 text-left transition ${
                    selectedSong === index
                      ? 'bg-pink-300 shadow-md'
                      : 'bg-pink-100 hover:bg-pink-200'
                  }`}
                >
                  {selectedSong === index ? '💗 ' : '🎵 '}
                  {item.name}
                </button>
              ))}
            </div>

            <button
              onClick={toggleMusic}
              className="mt-7 rounded-full bg-rose-400 px-8 py-3 font-semibold text-white shadow-lg"
            >
              {playing ? '⏸ Pause Music' : '▶ Play Music'}
            </button>

            {autoplayBlocked && (
              <p className="mt-4 text-xs text-rose-500">
                Browser mungkin memblokir autoplay. Tekan Play Music untuk memulai lagu.
              </p>
            )}
          </div>

          {/* FOOTER */}
          <footer className="pb-10 pt-6 text-center">
            <div className="animate-heartbeat text-5xl">💕</div>

            <p className="mt-5 font-semibold">
              Made with love, just for you.
            </p>

            <p className="mt-2 text-sm text-rose-600">
              Happy Anniversary Sayangg!
            </p>
          </footer>
        </section>
      )}

      {/* ANIMASI */}
      <style jsx global>{`
        .flower-message {
          animation: messageAppear .6s ease forwards;
        }

        @keyframes messageAppear {
          from {
            opacity: 0;
            transform: translateY(20px) scale(.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .bouquet-scene {
          isolation: isolate;
        }

        .bouquet-stem {
          position: absolute;
          z-index: 1;
          width: 5px;
          height: 145px;
          border-radius: 20px;
          background: linear-gradient(to bottom, #65a86a, #34794a);
          transform-origin: top;
        }

        .bouquet-leaf {
          position: absolute;
          z-index: 3;
          width: 35px;
          height: 65px;
          border-radius: 100% 0 100% 0;
          background: linear-gradient(135deg, #9acb8b, #478b56);
        }

        .leaf-one {
          left: 25%;
          top: 48%;
          transform: rotate(-35deg);
        }

        .leaf-two {
          right: 23%;
          top: 52%;
          transform: rotate(60deg);
        }

        .leaf-three {
          left: 44%;
          top: 58%;
          transform: rotate(-10deg);
        }

        .bouquet-flower {
          filter: drop-shadow(0 5px 5px rgba(190, 70, 120, .18));
          transition: transform .3s ease;
        }

        .bouquet-flower:active,
        .flower-selected {
          transform: translateX(-50%) scale(1.3) rotate(-8deg);
        }

        .bouquet-wrapper {
          position: absolute;
          z-index: 5;
          left: 50%;
          bottom: 15px;
          width: 190px;
          height: 130px;
          transform: translateX(-50%);
          clip-path: polygon(5% 0, 95% 0, 67% 100%, 33% 100%);
          background: linear-gradient(110deg, #f8c5d8, #fff0f5 48%, #eaa6c2);
          filter: drop-shadow(0 5px 5px rgba(150, 70, 100, .15));
        }

        .bouquet-ribbon {
          position: absolute;
          z-index: 8;
          left: 50%;
          bottom: 50px;
          transform: translateX(-50%);
          font-size: 38px;
        }

        .memory-card {
          height: 270px;
          transition: transform .35s ease, opacity .35s ease;
          transform-origin: center;
        }

        .memory-front {
          cursor: pointer;
        }
      `}</style>
    </main>
  );
}
