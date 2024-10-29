

exports.getUserLoginPage = (req, res)=>{
    res.render('userLogin')
};

exports.getUserRegisterPage = (req, res)=>{
    res.render('userRegister')
}

exports.getUserDashboardPage = (req, res)=>{
    res.render('userDashboard')
}
 exports.getAdminDashboardPage = (req, res)=>{
    res.render('adminDashboard')
 }

 exports.getAdminLogin = (req, res)=>{
    res.render('adminLogin')
 }

exports.getAdminUserManagement = (req, res)=>{
    res.render('adminUserManagement')
}

exports.getManageSlot = (req, res)=>{
    res.render('manageSlots')
}