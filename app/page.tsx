'use client';

import { useRef, useState } from 'react';

const flowerMessages = [
  'Kamu adalah hal indah yang selalu aku syukuri setiap hari. 💗',
  'Terima kasih sudah hadir dan mewarnai hidupku. 🌷',
  'Semoga kita selalu punya alasan untuk tersenyum bersama. 🌸',
  'Aku berharap masih ada banyak cerita indah bersama kamu. 💕',
  'Bunga ini kecil, tapi rasa sayangku jauh lebih besar. 🌹',
];

const flowers = ['🌷', '🌸', '🌹', '🌻', '🌺'];

const songs = [
  { name: 'Our Song 1 🎵', src: '/song1.mp3' },
  { name: 'Our Song 2 🎶', src: '/song2.mp3' },
  { name: 'Our Song 3 💗', src: '/song3.mp3' },
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

  const audioRef = useRef<HTMLAudioElement>(null);

  function checkPassword() {
    if (password === '131125') {
      setError('');
      setSlide(2);
    } else {
      setError('Password-nya salah, coba lagi yaa 💗');
    }
  }

  function openGift() {
    if (opening || opened) return;

    setOpening(true);

    window.setTimeout(() => {
      setOpening(false);
      setOpened(true);
    }, 1800);
  }

  function changeSong(index: number) {
    setSelectedSong(index);
    setPlaying(false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }
  }

  async function toggleMusic() {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-pink-100 via-rose-50 to-pink-200 text-rose-900">

      {/* SLIDE 1 - PASSWORD */}
      {slide === 1 && (
        <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <div className="mb-6 text-7xl animate-float">💌</div>

          <h1 className="text-3xl font-bold">
            A Little Surprise
          </h1>

          <p className="mb-8 mt-3 text-rose-700">
            Masukkan password untuk membuka hadiah kecil ini 💗
          </p>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkPassword()}
            placeholder="Masukkan password..."
            className="w-full max-w-xs rounded-2xl border border-pink-300 bg-white/80 p-4 text-center outline-none focus:ring-2 focus:ring-pink-400"
          />

          <button
            onClick={checkPassword}
            className="mt-5 rounded-full bg-rose-400 px-10 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
          >
            Open My Gift 💕
          </button>

          {error && (
            <p className="mt-4 text-sm text-red-500">{error}</p>
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
                className={`gift-scene relative mt-8 h-64 w-72 ${opening ? 'gift-opening' : ''}`}
              >
                <div className="gift-glow absolute bottom-12 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full" />

                <div className="absolute bottom-8 left-1/2 z-10 h-36 w-52 -translate-x-1/2 rounded-b-2xl border-4 border-pink-400 bg-gradient-to-br from-pink-300 to-rose-500 shadow-xl">
                  <div className="absolute left-1/2 h-full w-9 -translate-x-1/2 bg-pink-100" />
                  <div className="gift-heart absolute left-1/2 top-0 -translate-x-1/2 text-5xl">
                    💖
                  </div>
                </div>

                <div className="gift-lid absolute bottom-[164px] left-1/2 z-20 h-12 w-56 -translate-x-1/2 rounded-xl border-4 border-pink-400 bg-gradient-to-r from-pink-300 via-pink-100 to-rose-400 shadow-lg">
                  <div className="absolute left-1/2 h-full w-9 -translate-x-1/2 bg-white/70" />
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-6xl">
                    🎀
                  </div>
                </div>

                <span className="gift-sparkle absolute bottom-20 left-6 z-30 text-3xl">
                  ✨
                </span>

                <span className="gift-sparkle absolute bottom-36 right-8 z-30 text-3xl">
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
            <div className="mb-4 text-6xl animate-float">💗</div>

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

          {/* FLOWERS */}
          <div className="my-20 text-center">
            <div className="mb-4 text-5xl">💐</div>

            <h2 className="text-2xl font-bold">
              Flowers For You
            </h2>

            <p className="mb-8 mt-2 text-sm text-rose-600">
              Sentuh bunganya dan temukan pesan kecil dariku.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {flowers.map((flower, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedFlower(index)}
                  className={`flower-button rounded-2xl border border-pink-200 bg-white/75 p-5 text-4xl shadow-md ${
                    selectedFlower === index ? 'ring-2 ring-pink-400' : ''
                  }`}
                >
                  {flower}
                </button>
              ))}
            </div>

            {selectedFlower !== null && (
              <div key={selectedFlower} className="flower-message mt-6 rounded-2xl border border-pink-200 bg-white/80 p-6 shadow-md">
                <div className="mb-3 text-4xl">
                  {flowers[selectedFlower]}
                </div>

                <p className="leading-7">
                  {flowerMessages[selectedFlower]}
                </p>
              </div>
            )}
          </div>

          {/* PHOTO GALLERY */}
          <div className="my-20 text-center">
            <div className="mb-4 text-5xl">📸</div>

            <h2 className="text-2xl font-bold">
              Our Memories
            </h2>

            <p className="mb-8 mt-2 text-sm text-rose-600">
              Five little pieces of our story.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="flex aspect-square items-center justify-center rounded-2xl border-2 border-dashed border-pink-300 bg-white/60 text-center shadow-sm"
                >
                  <div>
                    <div className="text-5xl">📷</div>
                    <p className="mt-3 text-xs text-rose-600">
                      Memory {index + 1}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MUSIC */}
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

            <audio
              ref={audioRef}
              src={songs[selectedSong].src}
              onEnded={() => setPlaying(false)}
              onPause={() => setPlaying(false)}
              onPlay={() => setPlaying(true)}
              className="hidden"
            />

            <button
              onClick={toggleMusic}
              className="mt-7 rounded-full bg-rose-400 px-8 py-3 font-semibold text-white shadow-lg"
            >
              {playing ? '⏸ Pause Music' : '▶ Play Music'}
            </button>

            <p className="mt-4 text-xs text-rose-500">
              File lagu akan kita masukkan nanti yaa.
            </p>
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

      <style jsx global>{`
        .gift-lid {
          transform-origin: left bottom;
        }

        .gift-opening .gift-lid {
          animation: lidOpen 1.2s ease-in-out forwards;
        }

        .gift-glow {
          background: radial-gradient(
            circle,
            #fff 0%,
            #f9a8d4 40%,
            transparent 75%
          );
          opacity: 0;
        }

        .gift-opening .gift-glow {
          animation: glowOpen 1.8s ease-out forwards;
        }

        .gift-opening .gift-heart {
          animation: heartRise 1.5s ease-out forwards;
        }

        .gift-opening .gift-sparkle {
          animation: sparkleBurst 1.2s ease-in-out infinite;
        }

        @keyframes lidOpen {
          0% {
            transform: translateX(-50%) translateY(0) rotate(0);
          }
          50% {
            transform: translateX(-50%) translateY(-75px) rotate(-12deg);
          }
          100% {
            transform: translateX(-50%) translateY(-105px) rotate(-22deg);
            opacity: 0;
          }
        }

        @keyframes glowOpen {
          0% {
            opacity: 0;
            transform: translateX(-50%) scale(.3);
          }
          60% {
            opacity: 1;
            transform: translateX(-50%) scale(1.5);
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) scale(2);
          }
        }

        @keyframes heartRise {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(.5);
          }
          60% {
            opacity: 1;
            transform: translateY(-100px) scale(1.4);
          }
          100% {
            opacity: 0;
            transform: translateY(-150px) scale(1);
          }
        }

        @keyframes sparkleBurst {
          0%, 100% {
            opacity: .2;
            transform: scale(.6);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        .flower-button {
          transition: transform .3s ease, box-shadow .3s ease;
        }

        .flower-button:active {
          transform: scale(1.15) rotate(-8deg);
        }

        .flower-button:hover {
          transform: translateY(-6px) scale(1.08);
          box-shadow: 0 12px 25px rgba(244, 114, 182, .25);
        }

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
      `}</style>
    </main>
  );
}
