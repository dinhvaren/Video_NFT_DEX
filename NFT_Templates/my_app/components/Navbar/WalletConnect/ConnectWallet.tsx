import { useEffect, useState } from "react";
import { ConnectButton, useActiveWallet } from "thirdweb/react";

export default function ConnectWallet() {
    const wallet = useActiveWallet(); // Lấy thông tin ví
    const [client, setClient] = useState(null);
    const [wallets, setWallets] = useState([]);
    const [error, setError] = useState<string | null>(null); 

    useEffect(() => {
        if (!wallet) return; // Chỉ fetch nếu ví đã kết nối

        const fetchWalletData = async () => {
            try {
                const response = await fetch("http://localhost:3009/walletconnect"); 
                if (!response.ok) {
                    throw new Error("Lỗi khi lấy dữ liệu ví từ backend");
                }
                const data = await response.json();
                setClient(data.clientId); // Lưu client vào state
                setWallets(data.wallets); // Lưu danh sách ví vào state
            } catch (error: unknown) {
                console.error("Lỗi khi lấy ví:", error);
                if (error instanceof Error) { 
                    setError(error.message);
                } else if (typeof error === "string") { 
                    setError(error); 
                } else { 
                    setError("Đã xảy ra lỗi không xác định!"); 
                }
            }
        };

        fetchWalletData();
    }, [wallet]); 

    // Nếu có lỗi, hiển thị thông báo
    if (error) {
        return <p>⚠️ {error}</p>;
    }

    if (!client) {
        return <p>Đang tải dữ liệu ví...</p>;
    }

    return (
        <ConnectButton
            client={client}
            wallets={wallets}
            connectModal={{ size: "wide" }}
        />
    );
}
