"use client"
import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import axios from "axios";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

export default function AppPage() {
  const [twitterId, setTwitterId] = useState("")
  const [species, setSpecies] = useState("")
  const [personality, setPersonality] = useState("")
  const [story, setStory] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null);
  const [hearts, setHearts] = useState<Array<{id: number, x: number, y: number, emoji: string}>>([]);

  useEffect(() => {
    const emojis = ['❤️', '✨', '💫', '🌟', '💖'];
    const newHearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -100,
      emoji: emojis[Math.floor(Math.random() * emojis.length)]
    }));
    setHearts(newHearts);
  }, []);

  const clearPreviousResponse = () => {
    setSpecies("")
    setPersonality("")
    setStory("")
    setImage(null)
  }

  const handleClick = async() => {
    if(!twitterId){
      alert("please enter user twitter username")
      return null
    }
    clearPreviousResponse()
    setLoading(true)
    try {
      const response = await axios.post('/api/analyze-tweet', {userName: twitterId})
      console.log(response.data, "form beta dot pg")
      if (response.data.success) {
        setSpecies(response.data.data.analysis.species)
        setPersonality(response.data.data.analysis.partner_persona)
        setStory(response.data.data.analysis.personality)
        setImage(response.data.data.image)
      }
    } catch (error) {
      console.error(error)
      alert("Failed to generate analysis")
    } finally {
      setLoading(false)
    }
  }

  const shareToTwitter = async () => {
    if (!cardRef.current) return;
    
    try {
      setLoading(true);
      
      // Create a simple container
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.left = '0';
      container.style.top = '0';
      container.style.width = '100%';
      container.style.height = '100%';
      container.style.backgroundColor = 'white';
      container.style.zIndex = '9999';
      container.style.display = 'flex';
      container.style.alignItems = 'center';
      container.style.justifyContent = 'center';
      container.style.padding = '20px';
      
      // Clone the card
      const cardClone = cardRef.current.cloneNode(true) as HTMLElement;
      
      // Convert all gradient backgrounds to solid colors
      const elementsWithGradient = cardClone.querySelectorAll('[class*="bg-gradient"]');
      elementsWithGradient.forEach(el => {
        if (el instanceof HTMLElement) {
          // Replace gradient with solid color
          el.style.background = '#ffffff';
          el.style.backgroundColor = '#ffffff';
        }
      });
      
      // Set basic styles
      cardClone.style.transform = 'none';
      cardClone.style.transition = 'none';
      cardClone.style.width = '600px';
      cardClone.style.maxWidth = '100%';
      cardClone.style.backgroundColor = 'white';
      cardClone.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      cardClone.style.borderRadius = '24px';
      cardClone.style.padding = '20px';
      
      // Add to document
      container.appendChild(cardClone);
      document.body.appendChild(container);
      
      // Wait for render
      await new Promise(resolve => setTimeout(resolve, 100));
      
      try {
        // Import html2canvas
        const html2canvas = (await import('html2canvas')).default;
        
        // Capture
        const canvas = await html2canvas(cardClone, {
          backgroundColor: '#ffffff',
          scale: 1,
          useCORS: true,
          allowTaint: true,
          onclone: (clonedDoc) => {
            // Ensure all text is black
            const textElements = clonedDoc.querySelectorAll('p, h1, h2, h3, span');
            textElements.forEach(el => {
              if (el instanceof HTMLElement) {
                el.style.color = '#000000';
              }
            });
          }
        });
        
        // Convert to blob
        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Failed to create blob'));
          }, 'image/png', 1.0);
        });
        
        // Create download
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'my-parallel-universe.png';
        link.click();
        URL.revokeObjectURL(url);
        
        // Clean up
        document.body.removeChild(container);
        
        // Open Twitter
        const text = `✨ Just discovered my parallel self - I'm a magical ${species}! Ready to meet yours? https://paralleme.priyanshu.pro`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
      } catch (error) {
        throw error;
      } finally {
        // Ensure cleanup
        if (document.body.contains(container)) {
          document.body.removeChild(container);
        }
      }
    } catch (error) {
      alert('Failed to share. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SignedIn>
        <main className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 text-center p-4 font-sans relative overflow-hidden">
          {/* Floating hearts animation */}
          <div className="absolute inset-0 pointer-events-none">
            {hearts.map((heart) => (
              <motion.div
                key={heart.id}
                className="absolute text-2xl"
                initial={{ 
                  x: heart.x,
                  y: -100,
                  opacity: 0
                }}
                animate={{ 
                  y: window.innerHeight + 100,
                  opacity: [0, 1, 0],
                  rotate: Math.random() * 360
                }}
                transition={{ 
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
              >
                {heart.emoji}
              </motion.div>
            ))}
          </div>

          <section className="py-12 relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 font-bungee-shade px-4"
            >
              Discover Your Parallel Self ✨
            </motion.h1>
          </section>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative z-10 px-4"
          >
            <input 
              type="text" 
              placeholder="Enter your Twitter username" 
              onChange={(e) => setTwitterId(e.target.value)} 
              className="p-3 rounded-full w-full max-w-md outline-none mx-auto my-4 border-2 border-purple-300 text-black shadow-lg focus:border-pink-500 transition-all duration-300 font-space-grotesk text-sm sm:text-base"
            />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClick} 
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 sm:px-6 py-2 sm:py-3 cursor-pointer rounded-full mx-4 shadow-lg hover:shadow-xl transition-all duration-300 font-space-grotesk text-sm sm:text-base" 
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    ✨
                  </motion.span>
                  <span>Loading your parallel universe...</span>
                </div>
              ) : "Discover Your Parallel Self ✨"}
            </motion.button>
          </motion.div>

          {(species && personality) || image ? (
            <motion.div 
              ref={cardRef}
              data-card="true"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-8 max-w-4xl mx-auto bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-4 sm:p-6 text-black transform hover:scale-[1.02] transition-all duration-300 relative z-10 mx-4"
            >
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl sm:text-2xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 font-bungee-shade"
              >
                ✨ Your Parallel Universe Identity ✨
              </motion.h2>
              
              <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 items-start">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3"
                >
                  {species && personality && story && (
                    <>
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-3 shadow-lg w-full"
                      >
                        <h3 className="font-bold text-xs sm:text-sm text-purple-600 mb-0.5 font-bungee-shade">Species:</h3>
                        <p className="text-gray-700 text-xs sm:text-sm font-space-grotesk">{species}</p>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-3 shadow-lg w-full"
                      >
                        <h3 className="font-bold text-xs sm:text-sm text-pink-600 mb-0.5 font-bungee-shade">Personality:</h3>
                        <p className="text-gray-700 text-xs sm:text-sm font-space-grotesk">{personality}</p>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-3 shadow-lg w-full"
                      >
                        <h3 className="font-bold text-xs sm:text-sm text-purple-600 mb-0.5 font-bungee-shade">Story:</h3>
                        <p className="text-gray-700 text-xs sm:text-sm font-space-grotesk">{story}</p>
                      </motion.div>
                    </>
                  )}
                </motion.div>
                
                {image && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative group w-full h-full flex items-center justify-center"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      src={`data:image/png;base64,${image}`} 
                      alt="Your parallel universe self" 
                      className="relative rounded-2xl shadow-xl transform transition-all duration-300 w-full h-auto max-h-[600px] object-contain"
                    />
                  </motion.div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const text =  `✨ Just discovered my parallel self - I'm a magical ${species}! Ready to meet yours? https://paralleme.priyanshu.pro`;
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="w-full sm:flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-xs sm:text-sm font-semibold font-space-grotesk"
                  disabled={loading}
                >
                  Share Text Only 💫
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={shareToTwitter}
                  className="w-full sm:flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-xs sm:text-sm font-semibold font-space-grotesk"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Download & Share 🎨'}
                </motion.button>
              </div>
            </motion.div>
          ) : null}

          <motion.footer 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-20 text-sm text-gray-600 relative z-10 font-space-grotesk"
          >
            Built with 💘 by Priyanshu | @ParallelMeApp
          </motion.footer>
        </main>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
} 