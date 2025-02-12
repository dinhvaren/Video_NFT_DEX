import { useEffect, useState } from "react";
import { ConnectButton, useActiveWallet } from "thirdweb/react";

export default function ConnectWallet() {
// Lấy thông tin ví đang kết nối (nếu có)    
    const wallet = useActiveWallet(); 
// State để lưu clientId từ backend
    const [client, setClient] = useState(null);
// State để lưu danh sách ví khả dụng    
    const [wallets, setWallets] = useState([]);
// State để lưu lỗi 
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Chỉ fetch nếu ví đã kết nối
        if (!wallet) return; 

        const fetchWalletData = async () => {
            try {
                // Gọi API backend để lấy thông tin ví
                const response = await fetch("http://localhost:3009/walletconnect"); 
                // Nếu response không hợp lệ, báo lỗi
                if (!response.ok) {
                    throw new Error("Lỗi khi lấy dữ liệu ví từ backend");
                }
                // Chuyển response sang JSON
                const data = await response.json();
                // Lưu client vào state
                setClient(data.clientId); 
                // Lưu danh sách ví vào state
                setWallets(data.wallets); 
                // sử dụng catch để bắt lỗi và cập nhật state `error`
            } catch (error: unknown) {
                console.error("Lỗi khi lấy ví:", error);
                // Nếu lỗi là dạng Error object, lấy message
                if (error instanceof Error) { 
                    setError(error.message);
                // Nếu lỗi là string, giữ nguyên
                } else if (typeof error === "string") { 
                    setError(error); 
                // Trường hợp không xác định
                } else { 
                    setError("Đã xảy ra lỗi không xác định!"); 
                }
            }
        };

        fetchWalletData(); //Gọi hàm fetch dữ liệu khi `wallet` thay đổi
    }, [wallet]);  // Chạy lại khi `wallet` thay đổi

    // Nếu có lỗi, hiển thị thông báo
    if (error) {
        return <p>⚠️ {error}</p>;
    }

    if (!client) {
        return <p>Đang tải dữ liệu ví...</p>;
    }

    return (
        <ConnectButton
            client={client} // Truyền clientId vào nút kết nối
            wallets={wallets} // Truyền danh sách ví vào
            connectModal={{ size: "wide" }} //Cấu hình giao diện modal kết nối
        />
    );
}
