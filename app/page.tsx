'use client';

import { useRef, useState } from 'react';

const flowerMessages = [
  'Kamu adalah hal indah yang selalu aku syukuri 💗',
  'Terima kasih sudah hadir di hidupku 🌷',
  'Semoga kita selalu punya alasan untuk tersenyum bersama 🌸',
  'Aku berharap masih ada banyak cerita indah bersama kamu 💕',
  'Bunga ini kecil, tapi rasa sayangku jauh lebih besar 🌹',
];

const songs = [
  { name: 'Our Song 1 🎵', src: '/song1.mp3' },
  { name: 'Our Song 2 🎶', src: '/song2.mp3' },
  { name: 'Our Song 3 💗', src: '/song3.mp3' },
];

function GiftBox({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      aria-label="Buka kotak hadiah"
      className="group relative mt-8 h-56 w-64 cursor-pointer"
    >
      <div className="absolute bottom-5 left-1/2 h-8 w-48 -translate-x-1/2 rounded-full bg-pink-900/10 blur-md" />

      <div className="absolute bottom-8 left-1/2 h-32 w-48 -translate-x-1/2 rounded-b-2xl rounded-t-md border-4 border-pink-400 bg-gradient-to-br from-pink-300 to-rose-400 shadow-xl">
        <div className="absolute left-1/2 h-full w-7 -translate-x-1/2 bg-pink-100/90" />
        <div className="absolute left-1/2 top-0 h-full w-2 -translate-x-1/2 bg-white/50" />
        <div className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 rounded-full bg-pink-200 shadow" />
      </div>

      <div className="absolute bottom-[148px] left-1/2 z-10 h-9 w-52 -translate-x-1/2 rounded-xl border-4 border-pink-400 bg-gradient-to-r from-pink-300 via-pink-200 to-rose-400 shadow-lg transition-transform duration-700 group-hover:-translate-y-2">
        <div className="absolute left-1/2 top-0 h-full w-7 -translate-x-1/2 bg-pink-100" />
        <div className="absolute -top-8 left-1/2 flex -translate-x-1/2 items-center text-5xl text-pink-500">
          🎀
        </div>
      </div>

      <div className="absolute bottom-20 left-1/2 z-20 -translate-x-1/2 text-4xl transition-transform duration-300 group-hover:scale-125">
        💗
      </div>
    </button>
  );
}

export default function Home() {
  const [slide, setSlide] = useState(1);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [opened, setOpened] = useState(false);
  const [message, setMessage] = useState('');
  const [song, setSong] = useState(songs[0]);
  const audioRef = useRef<HTMLAudioElement>(null);

  function checkPassword() {
    if (password === '131125') {
      setError('');
      setSlide(2);
    } else {
      setError('Password-nya salah, coba lagi yaa 💗');
    }
  }

  function changeSong(index: number) {
    setSong(songs[index]);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-pink-100 via-rose-50 to-pink-200 text-rose-900">

      {slide === 1 && (
        <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <div className="mb-6 text-6xl animate-bounce">💌</div>
          <h1 className="mb-3 text-3xl font-bold">A Little Surprise</h1>
          <p className="mb-8 text-rose-700">Masukkan password untuk membuka hadiah kecil ini 💗</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkPassword()}
            type="password"
            placeholder="Masukkan password..."
            className="w-full max-w-xs rounded-2xl border border-pink-300 bg-white/80 p-4 text-center outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            onClick={checkPassword}
            className="mt-4 rounded-full bg-rose-400 px-10 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
          >
            Open My Gift 💕
          </button>
          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        </section>
      )}

      {slide === 2 && (
        <section className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
          {!opened ? (
            <div className="animate-fade-in">
              <p className="mb-2 text-lg">Ada sesuatu untuk kamuuu 🎁</p>
              <GiftBox onOpen={() => setOpened(true)} />
              <p className="mt-2 text-sm text-rose-600">Klik kotak hadiahnya yaa!</p>
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className="animate-bounce text-8xl">💝</div>
              <div className="mt-5 text-3xl">✨ 💗 ✨</div>
              <h1 className="mt-6 text-3xl font-bold">
                Happy Anniversary Sayangg💕💕
              </h1>
              <p className="mt-4">Ada banyak hal yang ingin aku ceritakan...</p>
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

      {slide === 3 && (
        <section className="mx-auto max-w-2xl px-5 py-12">
          <div className="mb-16 text-center">
            <div className="mb-4 text-5xl">💌</div>
            <h1 className="text-3xl font-bold">A Letter For You</h1>
            <p className="mt-2 text-sm text-rose-600">A little piece of my heart</p>
          </div>

          <article className="rounded-3xl border border-pink-200 bg-white/70 p-6 leading-8 shadow-lg">
            <h2 className="mb-5 text-center text-xl font-bold">Untuk Sayangku 💗</h2>
            Hai sayanggg, happy anniversary yaaa! 💕
            <br /><br />
            Aku cuma mau bilang terima kasih karena sudah menjadi bagian dari cerita hidupku. Terima kasih untuk setiap waktu, perhatian, cerita, dan hal-hal sederhana yang membuat hari-hariku terasa lebih berwarna.
            <br /><br />
            Aku tahu perjalanan kita tidak selalu sempurna. Tapi aku berharap kita bisa terus belajar memahami satu sama lain, saling mendukung, dan menciptakan lebih banyak kenangan indah.
            <br /><br />
            Semoga hari ini menjadi salah satu dari banyak hari bahagia yang akan kita rayakan bersama. I love youuu! 💗
          </article>

          <div className="my-16 text-center">
            <h2 className="mb-3 text-2xl font-bold">Flowers For You 🌷</h2>
            <p className="mb-8 text-sm">Coba sentuh bunga-bunganya yaa!</p>
            <div className="grid grid-cols-3 gap-4">
              {flowerMessages.map((msg, i) => (
                <button
                  key={i}
                  onClick={() => setMessage(msg)}
                  className="rounded-2xl border border-pink-200 bg-white/70 p-5 text-4xl shadow-md transition hover:-translate-y-2"
                >
                  {['🌷', '🌸', '🌹', '🌻', '🌺'][i]}
                </button>
              ))}
            </div>
            {message && (
              <div className="mt-6 rounded-2xl bg-white p-5 shadow-md">
                {message}
              </div>
            )}
          </div>

          <div className="my-16 text-center">
            <h2 className="mb-3 text-2xl font-bold">Our Memories 📸</h2>
            <p className="mb-8 text-sm">Five little pieces of our story</p>
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex aspect-square items-center justify-center rounded-2xl border-2 border-dashed border-pink-300 bg-white/60 text-center text-4xl shadow-sm"
                >
                  <div>
                    📷
                    <p className="mt-2 text-xs text-rose-600">Memory {i + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="my-16 rounded-3xl bg-white/70 p-6 text-center shadow-lg">
            <div className="mb-4 text-4xl">🎧</div>
            <h2 className="mb-3 text-2xl font-bold">Our Little Playlist</h2>
            <p className="mb-6 text-sm">Lagu-lagu yang menemani cerita kita 💗</p>
            <div className="space-y-3">
              {songs.map((item, i) => (
                <button
                  key={i}
                  onClick={() => changeSong(i)}
                  className={`w-full rounded-xl p-3 text-left ${song.src === item.src ? 'bg-pink-300' : 'bg-pink-100'}`}
                >
                  {song.src === item.src ? '💗 ' : '🎵 '}
                  {item.name}
                </button>
              ))}
            </div>
            <audio ref={audioRef} controls className="mt-6 w-full">
              <source src={song.src} type="audio/mpeg" />
            </audio>
            <p className="mt-3 text-xs text-rose-500">
              File lagu akan kita masukkan nanti yaa.
            </p>
          </div>

          <footer className="pb-10 pt-6 text-center">
            <div className="text-4xl">💕</div>
            <p className="mt-3 font-semibold">Made with love, just for you.</p>
            <p className="mt-2 text-sm">Happy Anniversary Sayangg!</p>
          </footer>
        </section>
      )}
    </main>
  );
}
