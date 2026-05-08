// export default async function Home() {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
//           <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
//               Hej
//           </h1>
//       </div>
//   );
// }

export default async function Home() {
    return (
        <div id="start-screen" className="screen">
            <h1 id="start_heading" className="primary">Look Who's Talking</h1>
            <h2 id="start_heading_second" className="secondary">Timing tool for mixed-gender conversations</h2>

            <div className="start-buttons-container">
                <button id="new-meeting-btn">New meeting</button>
                <button id="about-btn" className="secondary">About</button>
                <button id="how-to-use-btn" className="tertiary">How to use</button>
            </div>

        </div>
    );
}
