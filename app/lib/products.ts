type Item = {
  name: string;
  quantity: "single" | "pair" | "multiple";
  type: "device" | "speaker" | "accessory";
  description: string;
};

const items = [
  {
    name: "Display",
    quantity: "single",
    type: "device",
    description:
      "The display, typically a high-definition television or a projector, is the visual centerpiece of your home theater system. It's essential to choose one that matches the resolution and size of your viewing room. For a cinematic experience, consider a 4K UHD or 8K display with HDR capabilities, ensuring vibrant colors and deep blacks. Look for features like OLED or QLED technology for deeper contrast and wider viewing angles. Additionally, a display with a high refresh rate (120Hz or higher) is beneficial for fast-moving content like sports and action movies. Compatibility with different HDR formats such as Dolby Vision or HDR10+ can also enhance the viewing experience. When setting up, ensure the screen is positioned at an optimal distance and height for comfortable viewing, and consider ambient light control to prevent reflections and glare.",
  },
  {
    name: "AV Receiver",
    quantity: "single",
    type: "device",
    description:
      "The AV receiver acts as the command center of your home theater system. It not only routes audio and video signals to the display and speakers but also amplifies audio for a rich, dynamic sound. When choosing an AV receiver, consider the number of input and output ports, support for latest audio formats like Dolby Atmos or DTS:X, and compatibility with various video standards including 4K and 8K pass-through. Look for features like room calibration technology, which adjusts audio output to suit the acoustics of your room. Wireless connectivity (Bluetooth, Wi-Fi) for streaming audio and multi-room setup capabilities are also beneficial. The receiver should have enough channels to support all your speakers and provide options for future expansion. Lastly, ensure it integrates seamlessly with your other devices, possibly through a user-friendly interface or a dedicated app.",
  },
  {
    name: "Subwoofer",
    quantity: "single",
    type: "speaker",
    description:
      "The subwoofer is a key component in creating a full-bodied sound by reproducing low-frequency effects (LFE) and deep bass. For optimal performance, choose a subwoofer with a driver size that suits your room (10-12 inches is common for home theaters). Consider the subwoofer's power output and frequency response; a good subwoofer should deliver clean, undistorted bass even at high volumes. Placement is crucial - experiment with different locations in your room to find where the bass sounds best, commonly known as the 'subwoofer crawl'. Some modern subwoofers come with built-in room correction software to optimize performance. If your room is large or acoustically challenging, consider using more than one subwoofer to evenly distribute bass.",
  },
  {
    name: "Center",
    quantity: "single",
    type: "speaker",
    description:
      "The center channel speaker plays a pivotal role in your home theater, handling the bulk of dialogue and front-stage action. When selecting a center speaker, ensure it timbre-matches with your front speakers for a seamless sound transition. A speaker with a good frequency response and high sensitivity is ideal for clear, articulate dialogue. The placement is critical; it should be aligned with your display, ideally just below or above it, and at ear level when seated. This positioning ensures dialogue sounds as if it's coming directly from the actors on screen. Look for a design that minimizes diffraction and cabinet resonance for a clearer sound. Consider a center speaker with a wide dispersion pattern to ensure dialogue clarity from different seating positions.",
  },
  {
    name: "Front",
    quantity: "pair",
    type: "speaker",
    description:
      "Front speakers, comprising a left and right pair, are responsible for delivering the main soundtrack and stereo effects. They should provide a broad soundstage and precise imaging for an immersive experience. Look for speakers with a wide frequency range, ensuring rich highs and full mids. The placement is crucial; they should be placed at an equal distance from the listening position, forming an equilateral triangle with the listener. Tweaking the angle towards the listening area can enhance the stereo imaging. Floor-standing models are ideal for larger rooms, while bookshelf speakers can be adequate for smaller spaces. Bi-wiring or bi-amping can be considered for improved sound quality if your AV receiver and speakers support it.",
  },
  {
    name: "Surround Front",
    quantity: "pair",
    type: "speaker",
    description:
      "Surround front speakers extend the audio environment, creating a more enveloping sound field. These should be placed to the sides of your listening position, slightly above ear level. Bipolar or dipolar speakers are ideal for surround channels as they disperse sound more diffusely, enhancing the immersive effect. The choice between direct-radiating and bipolar/dipolar speakers depends on room acoustics and personal preference. Calibration is key; using your receiver’s calibration system can ensure they integrate seamlessly with the rest of the system. The surround front speakers should complement the tonal qualities of your front and center speakers for a cohesive sound experience.",
  },
  {
    name: "Surround Rear",
    quantity: "pair",
    type: "speaker",
    description:
      "Surround rear speakers are crucial for a full 360-degree audio experience, especially in a 5.1 or 7.1 surround sound setup. They should be placed behind the listener, slightly above ear level, to accurately reproduce sound effects and ambient noises, creating a sense of depth and location. The speakers should ideally have a wide dispersion to blend seamlessly with the front and surround front speakers, avoiding localized sounds. In-wall or on-wall speakers can be a good choice for aesthetic integration and space-saving. If your room's layout doesn't allow for ideal placement, adjustable stands or speaker mounts can offer flexibility. Remember, the goal is to create an immersive, enveloping sound field without any one speaker dominating the soundscape.",
  },
  {
    name: "Atmos Front",
    quantity: "pair",
    type: "speaker",
    description:
      "Atmos front speakers, part of the Dolby Atmos setup, add a vertical dimension to your soundstage, reproducing overhead sound effects. They can be either ceiling-mounted or upward-firing speakers placed on top of your front speakers. The choice depends on your room's layout and aesthetic preference. Ceiling-mounted speakers offer a more precise and immersive overhead sound, but installation can be more complex. Upward-firing speakers are a simpler solution, using the ceiling to reflect sound down to the listener. These speakers should be compatible with Dolby Atmos encoding, and placement is key to ensure the reflected sound accurately simulates overhead effects. Calibrating these speakers with your AV receiver's room correction system is crucial for a balanced and cohesive sound field.",
  },
  {
    name: "Atmos Rear",
    quantity: "pair",
    type: "speaker",
    description:
      "Similar to Atmos front speakers, Atmos rear speakers enhance the vertical sound dimension in your home theater, adding to the immersive experience. Placement is similar to Atmos front speakers but behind the listener. They can be ceiling-mounted or upward-firing, depending on your preference and room constraints. The integration of Atmos rear speakers with the rest of your system is vital; they should work in tandem with front Atmos and traditional surround speakers to create a cohesive and immersive 3D audio bubble. Proper calibration with your AV receiver is essential to ensure the overhead effects are accurately positioned and balanced with the rest of the audio.",
  },
  {
    name: "MiniDSP",
    quantity: "single",
    type: "accessory",
    description:
      "The MiniDSP is a powerful tool for audiophiles and home theater enthusiasts, offering advanced control over audio processing and calibration. It's a digital signal processor that allows you to fine-tune crossover frequencies, equalization, and room correction, ensuring each speaker in your system performs optimally in your specific environment. The ability to apply precise EQ adjustments can compensate for room acoustics and speaker placement issues. Some models offer Dirac Live or similar room correction technology, which measures and corrects the sound in your room for a flat frequency response. The MiniDSP can also be used to integrate multiple subwoofers, managing phase and time alignment for cohesive bass response across the listening area. While it requires some technical knowledge, the MiniDSP can significantly enhance the performance of your home theater audio.",
  },
  {
    name: "HDMI Cable",
    quantity: "multiple",
    type: "accessory",
    description:
      "High-quality HDMI cables are vital for transmitting high-resolution audio and video signals without loss or interference. They connect your display to the AV receiver and other sources like Blu-ray players or streaming devices. Ensure your HDMI cables are certified for the latest standards (e.g., HDMI 2.1 for 4K/8K and high frame rate content). Features like Ethernet support, ARC (Audio Return Channel), and eARC (enhanced ARC) can be beneficial for simplifying connections and improving audio quality. Cable length should be appropriate to your setup to avoid signal degradation, and build quality is important for durability and consistent performance. While extremely high-priced HDMI cables may not offer noticeable performance benefits, avoid very low-cost options as they might not reliably support high-bandwidth signals.",
  },
  {
    name: "Speaker Wire",
    quantity: "multiple",
    type: "accessory",
    description:
      "The right speaker wire is crucial for connecting your speakers to the AV receiver and ensuring optimal sound quality. The gauge (thickness) of the wire should be appropriate for the length of the run and the power of your amplifier. Thicker wires (lower gauge numbers) are better for longer distances and higher power applications. Oxygen-free copper (OFC) is a popular choice for its low resistance and minimal signal degradation. For in-wall installations, use UL-rated speaker wire for safety and compliance with building codes. The wire should be properly insulated to reduce the risk of signal interference from other electronic devices. When connecting, ensure the polarity is consistent across all speakers to avoid phase issues. Neat cable management not only looks better but can also prevent accidental damage or disconnections.",
  },
] as Item[];

type Category = {
  name: string;
  link: string;
  shortDescription: string;
};

const categories = [
  {
    name: "Speakers",
    link: "/products/speakers",
    shortDescription: "The heart of your home theater",
  },
  {
    name: "Displays",
    link: "/products/displays",
    shortDescription: "The visual centerpiece",
  },
  {
    name: "AV Receivers",
    link: "/products/av-receivers",
    shortDescription: "The command center of it all",
  },
  {
    name: "Subwoofers",
    link: "/products/subwoofers",
    shortDescription: "Shake the room with powerful bass",
  },
  {
    name: "Accessories",
    link: "/products/accessories",
    shortDescription: "The little things that make a difference",
  },
  {
    name: "Cables",
    link: "/products/cables",
    shortDescription: "Connect your devices with high-quality cables",
  },
] as Category[];

interface Product {
  url: string;
  image: string;
  title: string;
  price: string;
  brand: string;
  description: string;
  highlights: string[];
}

const mockProducts = [
  {
    url: "https://example.com/product1",
    image:
      "https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg",
    title: "FIRST PRODUCT",
    price: "$999",
    brand: "TESTING",
    description:
      "An immersive audio experience with state-of-the-art surround sound.",
    highlights: [
      "5.1 Channel Surround Sound",
      "Bluetooth Connectivity",
      "Easy Installation",
    ],
  },
  {
    url: "https://example.com/product2",
    image:
      "https://images.crutchfieldonline.com/ImageHandler/trim/750/457/products/2021/36/107/g107MXT12-F.jpg",
    title: "CinemaPro HD Projector",
    price: "$1,299",
    brand: "CinemaPro",
    description:
      "High-definition visuals that transform your living room into a movie theater.",
    highlights: [
      "4K Resolution",
      "3D Support",
      "Eco-Friendly Power Consumption",
    ],
  },
  {
    url: "https://example.com/product3",
    image:
      "https://images.crutchfieldonline.com/ImageHandler/trim/750/457/products/2021/36/107/g107MXT12-F.jpg",
    title: "AudioWave Soundbar 300",
    price: "$499",
    brand: "AudioWave",
    description: "Sleek design with powerful sound, perfect for any TV setup.",
    highlights: [
      "Wireless Subwoofer",
      "Integrated Voice Control",
      "Wall-Mountable",
    ],
  },
  {
    url: "https://example.com/product4",
    image:
      "https://images.crutchfieldonline.com/ImageHandler/trim/750/457/products/2021/36/107/g107MXT12-F.jpg",
    title: "BassKing 800 Subwoofer",
    price: "$350",
    brand: "BassKing",
    description:
      "Deep and resonating bass that elevates your audio experience.",
    highlights: [
      "Deep Bass Technology",
      "Compact Design",
      "Low Frequency Response",
    ],
  },
  {
    url: "https://example.com/product5",
    image:
      "https://images.crutchfieldonline.com/ImageHandler/trim/750/457/products/2021/36/107/g107MXT12-F.jpg",
    title: "ClearView 4K HDMI Cable",
    price: "$25",
    brand: "ClearView",
    description:
      "High-speed HDMI cable ensuring optimal picture quality and sound.",
    highlights: ["4K Resolution Support", "High Bandwidth", "Durable Build"],
  },
  {
    url: "https://example.com/product6",
    image:
      "https://images.crutchfieldonline.com/ImageHandler/trim/750/457/products/2021/36/107/g107MXT12-F.jpg",
    title: "EchoDome Wireless Speakers",
    price: "$450",
    brand: "EchoDome",
    description:
      "Immersive sound with stylish, room-filling audio performance.",
    highlights: ["360-Degree Sound", "Multi-Room Audio", "Elegant Design"],
  },
] as Product[];

export { type Item, items, type Category, categories, mockProducts };
