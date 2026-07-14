import { useState, useEffect, useRef } from "react";
import { Menu, X, MapPin, Clock, ChevronRight, Star, Instagram, Facebook, Youtube, Phone } from "lucide-react";

const NAV_LINKS = [
  { label: "Thực Đơn", href: "#menu" },
  { label: "Câu Chuyện", href: "#story" },
  { label: "Ưu Đãi", href: "#offers" },
  { label: "Cửa Hàng", href: "#stores" },
];

const MENU_ITEMS = [
  {
    id: 1,
    name: "Cà Phê Sữa Đá",
    desc: "Cà phê phin truyền thống pha cùng sữa đặc, phục vụ với đá lạnh. Hương vị đậm đà, ngọt ngào.",
    price: "39.000đ",
    tag: "Bestseller",
    category: "Cà Phê",
    img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=700&fit=crop&auto=format",
    alt: "Ly cà phê sữa đá mát lạnh",
  },
  {
    id: 2,
    name: "Bạc Xỉu",
    desc: "Sữa đặc hòa quyện cùng espresso, tạo nên tầng màu đẹp mắt và vị ngọt thanh đặc trưng.",
    price: "45.000đ",
    tag: "Mới",
    category: "Cà Phê",
    img: "https://images.unsplash.com/photo-1549652127-2e5e59e86a7a?w=600&h=700&fit=crop&auto=format",
    alt: "Ly bạc xỉu thơm ngon",
  },
  {
    id: 3,
    name: "Cold Brew Truyền Thống",
    desc: "Ủ lạnh 18 giờ từ hạt cà phê Arabica Đà Lạt — vị mượt mà, ít đắng, hậu vị ngọt nhẹ.",
    price: "55.000đ",
    tag: "Đặc biệt",
    category: "Cà Phê",
    img: "https://images.unsplash.com/photo-1527156231393-7023794f363c?w=600&h=700&fit=crop&auto=format",
    alt: "Cold brew đậm đà",
  },
  {
    id: 4,
    name: "Cappuccino",
    desc: "Espresso đậm kết hợp sữa tươi đánh bọt mịn, rắc bột cacao — phong cách Ý chuẩn mực.",
    price: "59.000đ",
    tag: "Hot",
    category: "Cà Phê",
    img: "https://images.unsplash.com/photo-1550731358-491ded4af838?w=600&h=700&fit=crop&auto=format",
    alt: "Tách cappuccino thơm ngon",
  },
  {
    id: 5,
    name: "Latte Art",
    desc: "Double shot espresso cùng lớp sữa tươi mềm mại, nghệ thuật latte được tạo hình tỉ mỉ bởi barista.",
    price: "59.000đ",
    tag: "Yêu thích",
    category: "Cà Phê",
    img: "https://images.unsplash.com/photo-1534687941688-651ccaafbff8?w=600&h=700&fit=crop&auto=format",
    alt: "Latte với nghệ thuật vẽ hình trên bề mặt",
  },
  {
    id: 6,
    name: "Americano Đá",
    desc: "Espresso pha loãng với nước lạnh — vị thanh, hậu đắng nhẹ. Lựa chọn lý tưởng cho người mới.",
    price: "45.000đ",
    tag: "Classic",
    category: "Cà Phê",
    img: "https://images.unsplash.com/photo-1503240778100-fd245e17a273?w=600&h=700&fit=crop&auto=format",
    alt: "Ly americano đá trong suốt",
  },
  {
    id: 7,
    name: "Trà Đào Cam Sả",
    desc: "Trà xanh tươi mát kết hợp đào mọng nước, cam vắt và lemon grass — giải nhiệt hoàn hảo.",
    price: "49.000đ",
    tag: "Yêu thích",
    category: "Trà",
    img: "https://images.unsplash.com/photo-1621221814951-fa755dd0c993?w=600&h=700&fit=crop&auto=format",
    alt: "Trà đào cam sả",
  },
  {
    id: 8,
    name: "Trà Sữa Trân Châu",
    desc: "Trà đen pha cùng sữa tươi béo ngậy, thêm trân châu đen dai giòn — mỗi ngụm đều thú vị.",
    price: "55.000đ",
    tag: "Mới",
    category: "Trà",
    img: "https://images.unsplash.com/photo-1575417634984-8e608b88a04b?w=600&h=700&fit=crop&auto=format",
    alt: "Ly trà sữa trân châu",
  },
  {
    id: 9,
    name: "Hồng Trà Lài",
    desc: "Hồng trà thượng hạng thoang thoảng hương hoa lài — thanh mát, dịu nhẹ, phù hợp mọi lúc.",
    price: "42.000đ",
    tag: "Thanh mát",
    category: "Trà",
    img: "https://images.unsplash.com/photo-1592083809134-edd367f82340?w=600&h=700&fit=crop&auto=format",
    alt: "Ly hồng trà hoa lài",
  },
  {
    id: 10,
    name: "Đá Xay Mocha",
    desc: "Cà phê espresso, chocolate, sữa tươi và đá xay mịn — tầng vị phong phú, béo ngậy, lý tưởng mùa hè.",
    price: "65.000đ",
    tag: "Đặc biệt",
    category: "Đá Xay",
    img: "https://images.unsplash.com/photo-1588929473475-d16ffd5d068c?w=600&h=700&fit=crop&auto=format",
    alt: "Ly đá xay mocha hấp dẫn",
  },
  {
    id: 11,
    name: "Đá Xay Caramel",
    desc: "Hòa quyện của cà phê, sốt caramel đậm, sữa tươi và đá xay — ngọt ngào nhưng không gắt.",
    price: "65.000đ",
    tag: "Bestseller",
    category: "Đá Xay",
    img: "https://images.unsplash.com/photo-1645783916385-1c99860a2a42?w=600&h=700&fit=crop&auto=format",
    alt: "Ly đá xay caramel béo ngậy",
  },
  {
    id: 12,
    name: "Sinh Tố Bơ Sữa",
    desc: "Bơ Đắk Lắk chín mềm xay cùng sữa đặc và đá — béo mượt, thơm ngát, no lâu.",
    price: "59.000đ",
    tag: "Tươi mới",
    category: "Đá Xay",
    img: "https://images.unsplash.com/photo-1525803377221-4f6ccdaa5133?w=600&h=700&fit=crop&auto=format",
    alt: "Sinh tố bơ sữa mịn màng",
  },
];

const STORES = [
  { name: "Highlands Coffee Vincom Bà Triệu", address: "191 Bà Triệu, Hai Bà Trưng, Hà Nội", hours: "06:00 – 23:00", phone: "024 3974 3974" },
  { name: "Highlands Coffee Lotte Center", address: "54 Liễu Giai, Ba Đình, Hà Nội", hours: "07:00 – 22:00", phone: "024 3831 5678" },
  { name: "Highlands Coffee Landmark 81", address: "720A Điện Biên Phủ, Bình Thạnh, TP. HCM", hours: "06:30 – 23:30", phone: "028 7308 5500" },
  { name: "Highlands Coffee Bitexco Tower", address: "Tầng 1, 2 Hải Triều, Quận 1, TP. HCM", hours: "07:00 – 22:30", phone: "028 3521 2121" },
];

const AWARDS = [
  { year: "2002", text: "Thương hiệu cà phê Việt Nam" },
  { year: "500+", text: "Cửa hàng toàn quốc" },
  { year: "20M+", text: "Khách hàng thân thiết" },
  { year: "No.1", text: "Chuỗi cà phê #1 Việt Nam" },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      style={{ fontFamily: "'Mulish', sans-serif" }}
    >
      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[#1C0800]/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M3 9h18v2a9 9 0 01-18 0V9z" fill="#FFF8F0" />
                <path d="M7 9V6a5 5 0 0110 0v3" stroke="#FFF8F0" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M19 9h1a2 2 0 010 4h-1" stroke="#FFF8F0" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M8 20h8" stroke="#FFF8F0" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div
                className="text-lg font-bold leading-none tracking-wide"
                style={{ fontFamily: "'Playfair Display', serif", color: scrolled ? "#FFF8F0" : "#FFF8F0" }}
              >
                HIGHLANDS
              </div>
              <div className="text-[9px] tracking-[0.25em] uppercase" style={{ color: "#C4892A" }}>
                Coffee
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium tracking-wide transition-colors hover:text-accent"
                style={{ color: "#FFF8F0" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="#offers"
              className="text-sm font-semibold px-5 py-2.5 bg-primary text-primary-foreground rounded hover:bg-[#6B0C0C] transition-colors tracking-wide"
            >
              Đặt Ngay
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-[#1C0800] border-t border-white/10 px-6 py-6 flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-base text-white/90 font-medium hover:text-accent transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#offers"
              className="mt-2 text-center text-sm font-semibold px-5 py-3 bg-primary text-primary-foreground rounded hover:bg-[#6B0C0C] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Đặt Ngay
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-end overflow-hidden bg-[#1C0800]"
      >
        <img
          src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1600&h=1000&fit=crop&auto=format"
          alt="Không gian ấm cúng tại Highlands Coffee"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C0800] via-[#1C0800]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C0800]/70 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pb-20 md:pb-28">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 border border-accent/50 rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">
                Thương Hiệu Cà Phê Số 1 Việt Nam
              </span>
            </div>

            <h1
              className="text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Mỗi Ly Cà Phê,<br />
              <span className="italic text-accent">Một Câu Chuyện</span>
            </h1>

            <p className="text-white/75 text-lg md:text-xl leading-relaxed mb-10 max-w-lg font-light">
              Từ hạt cà phê Arabica Đà Lạt đến từng ly thức uống tinh tế — Highlands Coffee mang hương vị Việt đến mọi khoảnh khắc của bạn.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold text-sm tracking-wide hover:bg-[#6B0C0C] transition-all hover:gap-3 rounded-sm"
              >
                Khám Phá Thực Đơn <ChevronRight size={16} />
              </a>
              <a
                href="#story"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/40 text-white font-semibold text-sm tracking-wide hover:border-white/70 hover:bg-white/10 transition-all rounded-sm"
              >
                Câu Chuyện Của Chúng Tôi
              </a>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 right-10 flex flex-col items-center gap-2 opacity-50">
          <div className="w-px h-12 bg-white/50 animate-pulse" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-white rotate-90 origin-center translate-x-4">Cuộn xuống</span>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-primary py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-white/20">
            {AWARDS.map((a) => (
              <div key={a.year} className="flex flex-col items-center text-center py-2">
                <span
                  className="text-3xl md:text-4xl font-bold text-white mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {a.year}
                </span>
                <span className="text-[11px] tracking-[0.12em] uppercase text-white/65 font-medium">{a.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MENU SECTION */}
      <section id="menu" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="text-[11px] tracking-[0.25em] uppercase text-accent font-semibold block mb-3">
                Thực Đơn
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold text-foreground leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Những Ly Thức Uống<br />
                <span className="italic">Đánh Cắp Trái Tim</span>
              </h2>
            </div>
            <a
              href="#menu"
              className="self-start md:self-end inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all border-b border-primary pb-0.5"
            >
              Xem Toàn Bộ Thực Đơn <ChevronRight size={14} />
            </a>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-3 mb-10 flex-wrap">
            {["all", "Cà Phê", "Trà", "Đá Xay"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-semibold tracking-wide uppercase rounded-sm transition-all ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/70"
                }`}
              >
                {tab === "all" ? "Tất Cả" : tab}
              </button>
            ))}
          </div>

          {/* Menu grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MENU_ITEMS.filter((item) => activeTab === "all" || item.category === activeTab).map((item) => (
              <div
                key={item.id}
                className="group bg-card rounded-sm overflow-hidden border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="relative overflow-hidden h-64 bg-muted">
                  <img
                    src={item.img}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase bg-primary text-primary-foreground rounded-sm">
                      {item.tag}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3
                    className="text-lg font-bold text-foreground mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                    {item.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-primary">{item.price}</span>
                    <button className="flex items-center gap-1 text-xs font-semibold text-accent hover:text-primary transition-colors">
                      Đặt Ngay <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section id="story" className="bg-[#1C0800] py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Image side */}
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden bg-[#3A1800]">
                <img
                  src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=1000&fit=crop&auto=format"
                  alt="Hạt cà phê Arabica chọn lọc từ vùng đất Đà Lạt"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C0800]/60 to-transparent" />
              </div>
              {/* floating card */}
              <div className="absolute -bottom-6 -right-4 md:-right-8 bg-accent text-[#1C0800] px-6 py-5 rounded-sm shadow-2xl max-w-[220px]">
                <div
                  className="text-3xl font-bold mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  2002
                </div>
                <div className="text-xs font-semibold tracking-wide leading-snug">
                  Năm Highlands Coffee chính thức ra đời tại Việt Nam
                </div>
              </div>
            </div>

            {/* Text side */}
            <div className="md:pl-8">
              <span className="text-[11px] tracking-[0.25em] uppercase text-accent font-semibold block mb-4">
                Câu Chuyện Thương Hiệu
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Từ Vùng Đất Cao Nguyên<br />
                <span className="italic text-accent">Đến Từng Tách Cà Phê</span>
              </h2>
              <p className="text-white/65 text-base leading-loose mb-5">
                Highlands Coffee ra đời năm 2002 với sứ mệnh tôn vinh văn hóa cà phê Việt Nam. Chúng tôi chắt lọc tinh hoa từ những vùng đất cao nguyên như Đà Lạt, Buôn Ma Thuột — nơi hạt cà phê Arabica và Robusta lớn lên trong sương mù và đất đỏ bazan.
              </p>
              <p className="text-white/65 text-base leading-loose mb-8">
                Mỗi ly cà phê là hành trình từ người nông dân trồng trọt tâm huyết đến bàn tay khéo léo của barista, để bạn thưởng thức một tách cà phê mang trọn hồn Việt.
              </p>

              {/* Feature list */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                {["Nguồn gốc 100% Việt Nam", "Rang xay tươi hằng tuần", "Không phụ gia, 100% tự nhiên", "Tiêu chuẩn quốc tế"].map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <div className="w-4 h-4 mt-0.5 flex-shrink-0">
                      <Star size={14} fill="#C4892A" className="text-accent" />
                    </div>
                    <span className="text-sm text-white/70 leading-snug">{f}</span>
                  </div>
                ))}
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-accent text-accent font-semibold text-sm tracking-wide hover:bg-accent hover:text-[#1C0800] transition-all rounded-sm"
              >
                Đọc Thêm Về Chúng Tôi <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PROMO / APP BANNER */}
      <section id="offers" className="relative py-20 overflow-hidden bg-accent">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231C0800' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div>
              <span className="text-[11px] tracking-[0.25em] uppercase text-[#1C0800]/60 font-semibold block mb-3">
                Ưu Đãi Hội Viên
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold text-[#1C0800] leading-tight mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Tích Điểm — Nhận Quà<br />
                <span className="italic">Mỗi Ngày</span>
              </h2>
              <p className="text-[#1C0800]/70 text-base leading-relaxed max-w-lg">
                Tải ứng dụng Highlands Coffee, tích điểm cho mỗi giao dịch và đổi điểm thành những phần thức uống miễn phí. Hơn 2 triệu hội viên đang tận hưởng ưu đãi mỗi ngày.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <a
                href="#"
                className="flex items-center gap-3 px-5 py-3.5 bg-[#1C0800] text-white rounded-sm hover:bg-[#2e1100] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                <div>
                  <div className="text-[10px] opacity-70">Tải trên</div>
                  <div className="text-sm font-bold">App Store</div>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-5 py-3.5 bg-[#1C0800] text-white rounded-sm hover:bg-[#2e1100] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M3.18 23.76c.38.2.82.22 1.24-.01l11.41-6.47-2.6-2.6-10.05 9.08zM.5 1.64C.19 2.04 0 2.6 0 3.29v17.42c0 .69.19 1.25.5 1.65l.08.07 9.76-9.76v-.23L.58 1.57.5 1.64zM20.1 10.09l-2.6-1.48-2.91 2.91 2.91 2.9 2.62-1.49c.75-.43.75-1.42-.02-1.84zM4.42.25L15.83 6.72l-2.6 2.6L3.18.24c.42-.23.86-.21 1.24.01z"/></svg>
                <div>
                  <div className="text-[10px] opacity-70">Tải trên</div>
                  <div className="text-sm font-bold">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STORE LOCATOR */}
      <section id="stores" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="mb-14">
            <span className="text-[11px] tracking-[0.25em] uppercase text-accent font-semibold block mb-3">
              Hệ Thống Cửa Hàng
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-foreground"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Tìm Cửa Hàng<br />
              <span className="italic">Gần Bạn Nhất</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Map placeholder */}
            <div className="relative rounded-sm overflow-hidden h-80 md:h-auto bg-muted border border-border">
              <img
                src="https://images.unsplash.com/photo-1717924070810-a178d8540110?w=800&h=600&fit=crop&auto=format"
                alt="Không gian cửa hàng Highlands Coffee"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C0800]/80 to-transparent flex items-end p-8">
                <div>
                  <div
                    className="text-3xl font-bold text-white mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    500+ Cửa Hàng
                  </div>
                  <div className="text-sm text-white/65">Trải rộng trên 60 tỉnh thành</div>
                </div>
              </div>
            </div>

            {/* Store list */}
            <div className="flex flex-col gap-4">
              {STORES.map((store) => (
                <div
                  key={store.name}
                  className="bg-card border border-border rounded-sm p-5 hover:border-primary/40 hover:shadow-md transition-all cursor-pointer group"
                >
                  <h3
                    className="font-bold text-foreground text-base mb-2 group-hover:text-primary transition-colors"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {store.name}
                  </h3>
                  <div className="space-y-1.5 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <MapPin size={13} className="mt-0.5 flex-shrink-0 text-accent" />
                      <span>{store.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={13} className="flex-shrink-0 text-accent" />
                      <span>{store.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={13} className="flex-shrink-0 text-accent" />
                      <span>{store.phone}</span>
                    </div>
                  </div>
                </div>
              ))}

              <a
                href="#"
                className="mt-2 text-center py-3 border border-primary text-primary font-semibold text-sm tracking-wide hover:bg-primary hover:text-primary-foreground transition-all rounded-sm"
              >
                Xem Tất Cả Cửa Hàng
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-card border-y border-border py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <span className="text-[11px] tracking-[0.25em] uppercase text-accent font-semibold block mb-3">
              Khách Hàng Nói Gì
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Những Khoảnh Khắc Đáng Nhớ
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Nguyễn Thị Lan",
                location: "Hà Nội",
                text: "Cà Phê Sữa Đá ở Highlands luôn đậm đà và nhất quán dù ở bất kỳ chi nhánh nào. Đây là nơi tôi bắt đầu mỗi buổi sáng suốt 5 năm qua.",
                stars: 5,
              },
              {
                name: "Trần Minh Khoa",
                location: "TP. Hồ Chí Minh",
                text: "Không gian rộng rãi, wifi nhanh, cà phê ngon — lý tưởng để làm việc hoặc gặp gỡ đối tác. Trà Đào Cam Sả là món tôi order mỗi lần đến.",
                stars: 5,
              },
              {
                name: "Phạm Thu Hà",
                location: "Đà Nẵng",
                text: "Cold Brew của Highlands khác biệt hoàn toàn so với chỗ khác — mượt, không đắng gắt, uống cả ngày không ngán. Chương trình tích điểm cũng rất hấp dẫn.",
                stars: 5,
              },
            ].map((review) => (
              <div key={review.name} className="bg-background border border-border rounded-sm p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <Star key={i} size={13} fill="#C4892A" className="text-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-loose mb-5 italic">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{review.name[0]}</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{review.name}</div>
                    <div className="text-xs text-muted-foreground">{review.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1C0800] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
            {/* Brand */}
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M3 9h18v2a9 9 0 01-18 0V9z" fill="#FFF8F0" />
                    <path d="M7 9V6a5 5 0 0110 0v3" stroke="#FFF8F0" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <div className="text-base font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                    HIGHLANDS COFFEE
                  </div>
                  <div className="text-[9px] tracking-[0.2em] uppercase text-accent">Vị Việt — Hồn Việt</div>
                </div>
              </div>
              <p className="text-sm text-white/50 leading-loose max-w-xs">
                Thương hiệu cà phê Việt Nam với sứ mệnh tôn vinh văn hóa cà phê và kết nối người Việt qua từng tách cà phê.
              </p>
              <div className="flex gap-4 mt-6">
                {[Facebook, Instagram, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-8 h-8 rounded-sm border border-white/20 flex items-center justify-center text-white/50 hover:border-accent hover:text-accent transition-colors"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              {
                title: "Thực Đơn",
                links: ["Cà Phê", "Trà", "Đá Xay", "Bánh & Snack", "Thực Đơn Theo Mùa"],
              },
              {
                title: "Về Chúng Tôi",
                links: ["Câu Chuyện Thương Hiệu", "Giá Trị Cốt Lõi", "Sustainability", "Nhượng Quyền"],
              },
              {
                title: "Hỗ Trợ",
                links: ["Liên Hệ", "Tìm Cửa Hàng", "Ứng Dụng Di Động", "Chính Sách Bảo Mật"],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-white mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-white/45 hover:text-accent transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30">
              © 2024 Highlands Coffee. Tất cả quyền được bảo lưu.
            </p>
            <p className="text-xs text-white/30">
              Thiết kế bởi sinh viên — Dự án học thuật
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
