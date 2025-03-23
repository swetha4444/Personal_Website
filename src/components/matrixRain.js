import React, { useEffect, useRef } from 'react';

const MatrixRain = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Make canvas full screen
        const resizeCanvas = () => {
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Matrix characters
        const matrix = "abcdefghijklmnopqrstuvwxyzアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789".split("");
        
        const fontSize = 12;
        const columns = canvas.width/fontSize;
        const drops = new Array(Math.floor(columns)).fill(1);

        const draw = () => {
            // Black BG with opacity for trail effect
            ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Set text style
            ctx.fillStyle = "#59c54d"; 
            
            ctx.font = fontSize + "px arial";

            // Draw characters
            drops.forEach((drop, i) => {
                // Random character
                const text = matrix[Math.floor(Math.random() * matrix.length)];
                const x = i * fontSize;
                const y = drop * fontSize;
                
                ctx.fillText(text, x, y);

                // Reset drop to top if it's at bottom
                if(y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                // Move drop down
                drops[i]++;
            });
        };

        // Animation loop
        const interval = setInterval(draw, 55);

        // Cleanup
        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                background: '#000000'
            }}
        />
    );
};

export default MatrixRain;