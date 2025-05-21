import GroupFixedButtons from "../components/GroupFixedButtons";

const AboutUs = () => {
    const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER;
    return (
        <>
            <section className="px-4 py-8 max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">Giới Thiệu</h2>

                <div className="text-gray-800 space-y-6">
                    <p className="text-center text-lg text-orange-600 font-semibold">
                        KÍNH GỬI: QUÝ KHÁCH HÀNG!
                    </p>

                    <p>
                        <span className="text-emerald-600">Lời đầu tiên <strong>MVP AUTO</strong> xin được gửi đến quý khách hàng lời chào trân trọng, lời chúc sức khoẻ, thành công và thịnh vượng.</span>
                    </p>

                    <p>
                        <span className="text-emerald-600">Nhiều năm qua <strong>MVP AUTO</strong> được biết đến là đơn vị chuyên cung cấp, phân phối và bán lẻ phụ tùng, linh kiện, sản phẩm trang trí cho các loại xe ô tô. Chúng tôi luôn tuân thủ phương châm <strong>MANG LẠI GIÁ TRỊ TỐT NHẤT CHO KHÁCH HÀNG</strong>.
                        </span>
                    </p>

                    <p className="text-emerald-600">
                        Sản phẩm được nhập khẩu trực tiếp từ các thương hiệu nổi tiếng: Nhật, Thái, Mỹ, Đức, Hàn, Australia... Đảm bảo đầy đủ phân khúc:
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 list-disc pl-6 text-emerald-600">
                        <li><strong>TOYOTA</strong>: INNOVA, FORTUNER, VIOS, CAMRY, ALTIS...</li>
                        <li><strong>FORD</strong>: RANGER, TRANSIT, MONDEO...</li>
                        <li><strong>MAZDA</strong>: BT50, CX5, MAZDA 2, 3, 6...</li>
                        <li><strong>MITSUBISHI</strong>: TRITON, PAJERO, GRANDIS...</li>
                        <li><strong>NISSAN</strong>: NAVARA, X-TRAIL, TERRA...</li>
                        <li><strong>HONDA</strong>: CIVIC, CITY, CR-V, BRIO...</li>
                        <li><strong>ISUZU</strong>: D-MAX, MU-X...</li>
                        <li><strong>HYUNDAI</strong>: SANTA-FE, TUCSON, I10...</li>
                        <li><strong>KIA</strong>: SORENTO, MORNING, CERATO...</li>
                        <li><strong>CHEVROLET</strong>: CRUZE, COLORADO...</li>
                        <li><strong>CHÂU ÂU</strong>: MERCEDES, BMW, AUDI...</li>
                    </ul>

                    <p className="text-emerald-600">
                        Ngoài ra <strong>MVP AUTO</strong> còn phân phối linh kiện từ: <strong>555, AISIN, KYB, RBI, NSK, MITSUBOSHI...</strong>
                    </p>

                    <p className="text-emerald-600">
                        Nhận đặt hàng khó tìm nhanh chóng, đổi trả theo chính sách hãng.
                    </p>

                    <p className="text-emerald-600">
                        Đội ngũ tận tâm, giao hàng nhanh, thanh toán linh hoạt, trải nghiệm mà quý khách xứng đáng nhận được.
                    </p>

                    <p className="text-emerald-600">
                        Mọi thác mắc xin liên hệ: <strong>Hotline: {phoneNumber}</strong>
                    </p>

                    <p className="text-emerald-600 font-semibold">
                        Trân trọng cảm ơn quý khách đã lựa chọn MVP AUTO!
                    </p>
                </div>
            </section>
            <GroupFixedButtons />
        </>
    );
};
export default AboutUs;