import { forwardRef, useEffect, useRef, useState } from 'react';

const OTP_SIZE = 4;
const MAX = 9;
export function App() {
  const [tiles, setTiles] = useState<number[]>(new Array(OTP_SIZE).fill(-1));
  const [selectedTile, setSelectedTile] = useState(0);

  const selectedRef = useRef<HTMLInputElement>(null);

  function onTileChange(index: number, value: number) {
    setTiles((tiles) => {
      tiles[index] = value;
      return tiles;
    });
    setSelectedTile((tile) => {
      return tile + 1;
    });
  }

  useEffect(() => {
    selectedRef.current?.focus();
  }, [selectedTile, selectedRef]);

  return (
    <main className="bg-slate-800 text-white h-screen p-2 flex justify-center items-center">
      <div className="p-2 flex gap-2">
        {tiles.map((tile, index) => (
          <Tile
            disabled={tile !== -1 && selectedTile !== index}
            ref={index === selectedTile ? selectedRef : null}
            key={index}
            value={tile}
            onChange={(value: number) => onTileChange(index, value)}
          />
        ))}
      </div>
    </main>
  );
}

export default App;

export type TileRef = HTMLInputElement;

interface TileProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export const Tile = forwardRef<TileRef, TileProps>(
  ({ onChange, value, disabled }, ref) => (
    <input
      ref={ref}
      disabled={disabled}
      type="number"
      max={MAX}
      value={value === -1 ? undefined : value}
      className="w-24 border text-center text-4xl font-bold rounded h-24 text-white bg-transparent"
      onChange={(e) => {
        const newValue = Number(e.target.value);
        if (newValue < MAX) {
          onChange(newValue);
        }
      }}
    />
  )
);
