const foodMsg = {
  nameExisted: 'Món ăn đã tồn tại',
  notFound: 'Không thể tìm thấy món ăn',
  created: 'Tạo món ăn thành công',
  success: 'Thành công'
}

const exerciseMsg = {
  nameExisted: 'Bài tập đã tồn tại',
  notFound: 'Không thể tìm thấy bài tập',
  created: 'Tạo bài tập thành công',
  success: 'Thành công'
}

const mealDiaryMsg = {
  nameExisted: 'Món ăn đã tồn tại trong thực đơn',
  notFound: 'Không thể tìm thấy món ăn',
  created: 'Thêm món ăn thành công vào trong thực đơn',
  success: 'Thành công'
}

const UserMsg = {
  phoneExisted: 'Số điện thoại đã tồn tại',
  notFound: 'Số điện thoại không tồn tại',
  notCorrectPassword: 'Mật khẩu không đúng'
}

const SystemMsg = {
  successLogin: 'Đăng nhập thành công',
  successRegister: 'Đăng kí thành công',
  successLogout: 'Đăng xuất thành công',
  joiWrongFormatErroMsg: '"{{#label}}" sai định dạng',
  passwordFailedLength: 'Mật khẩu ít nhất đạt 8 ký tự',
  passwordFailedMixCharacterCondition: 'Mật khẩu phải chứa ít nhất 1 chữ cái và 1 số'
}

module.exports = {
  UserMsg,
  foodMsg,
  exerciseMsg,
  SystemMsg,
  mealDiaryMsg
}
