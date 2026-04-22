export const generate_UserID = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const rand = Math.random().toString(36).substring(2,5).toUpperCase();

    return `ERP${timestamp}-${rand}`;

}

export const generateBranchID = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const rand = Math.random().toString(36).substring(2,3).toUpperCase();

    return `BRNCH${rand}${timestamp}`;
}

export const generateSupplierID = () => {
    const now = new Date();
    const yy = now.getFullYear().toString().slice(2);
    const mm = String(now.getMonth() + 1).padStart(2, '0'); 
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0'); 
    const min = String(now.getMinutes()).padStart(2, '0'); 
    const randomPart = Math.random().toString(36).slice(2, 5).toUpperCase();

    return `S${yy}${mm}${dd}${hh}${min}${randomPart}`;
}