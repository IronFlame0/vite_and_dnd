import * as React from 'react'
import './App.css'

function getRandomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 80%, 60%)`
}

function getRandomPosition() {
  return {
    x: Math.random() * (window.innerWidth - 150),
    y: Math.random() * (window.innerHeight - 150)
  }
}

type Block = {
  id: number;
  x: number;
  y: number;
  color: string;
};

function App() {
  const [blocks, setBlocks] = React.useState<Block[]>([])

  const createBlockHandler = () => {
    const id = Date.now()
    const {x, y} = getRandomPosition()
    const color = getRandomColor()

    setBlocks(prev => [...prev, {id, x, y, color}])
  }

  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    id: number
  ) => {
    const block = blocks.find(b => b.id === id);
    if (!block) return;

    const rect = e.currentTarget.getBoundingClientRect();

    e.dataTransfer.setData("block-id", String(id));
    e.dataTransfer.setData("color", block.color);
    e.dataTransfer.setData("dragOffset", JSON.stringify({
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top
    }));
    e.dataTransfer.effectAllowed = "move";
    setTimeout(() => {
      setBlocks(prev => prev.filter(b => b.id !== id));
    }, 0)


  };

  const onDragOver = (e: React.DragEvent) => {
    // Allow drop event to work
    e.preventDefault();
  };


  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const id = Number(e.dataTransfer.getData("block-id"));

    if (!id) {
      return
    }
    const color = e.dataTransfer.getData("color");
    const {offsetX, offsetY} = JSON.parse(e.dataTransfer.getData("dragOffset"))
    const idNew = Date.now()
    const newX = e.clientX - offsetX;
    const newY = e.clientY - offsetY;
    setBlocks(prev => [...prev, {id: idNew, x: newX, y: newY, color}])
  };

  return (
    <div style={{
      position: "relative",
      width: "100vw",
      height: "100vh",
      overflow: "hidden"
    }} onDragOver={onDragOver}
         onDrop={onDrop}>
      <button onClick={createBlockHandler}>Create block</button>
      {blocks.map(block => (
        <div
          key={block.id}
          draggable
          onDragStart={e => onDragStart(e, block.id)}
          style={{
            position: "absolute",
            left: block.x,
            top: block.y,
            width: 100,
            height: 100,
            background: block.color,
            cursor: "grab",
            userSelect: "none"
          }}
        />
      ))}
    </div>
  )
}

export default App
