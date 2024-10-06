export const MainLayout = ({ children }) => {
    return (
        <>
            <Header />
                <div style={{ display: "flex" }}>
            <Menu />
                <div style={{ flex: 1 }}>
                    {children}
                </div>
                </div>
            <Footer />
        </>
    );
};