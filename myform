import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Định nghĩa schema xác thực với Yup
const schema = yup.object().shape({
  // Thông tin người mua BH
  sttNguoiMua: yup.string(),
  soTkckBenMua: yup.string().required('Số TKCK bên mua là bắt buộc'),
  tenNguoiMuaBH: yup.string().required('Tên người mua BH là bắt buộc'),
  ngaySinhNguoiMua: yup.date().nullable().transform((curr, orig) => orig === '' ? null : curr).required('Ngày sinh là bắt buộc').typeError('Ngày sinh không hợp lệ'),
  cmndNguoiMua: yup.string().required('CMND/CCCD/HC là bắt buộc'),

  // Thông tin TKCK cắt tiền
  tkckCatTien: yup.string().required('TKCK cắt tiền là bắt buộc'),
  hoTenTkck: yup.string().required('Họ tên TKCK là bắt buộc'),
  cmndTkck: yup.string().required('CMND/CCCD/HC TKCK là bắt buộc'),
  ngayCapTkck: yup.date().nullable().transform((curr, orig) => orig === '' ? null : curr).required('Ngày cấp TKCK là bắt buộc').typeError('Ngày cấp không hợp lệ'),
  noiCapTkck: yup.string().required('Nơi cấp TKCK là bắt buộc'),

  // Thông tin người quản lý
  idNguoiGioiThieu: yup.string(),
  tenNguoiGioiThieu: yup.string(),
  waQuanLy: yup.string(),
  teamQuanLy: yup.string(),
  soDienThoaiWA: yup.string().matches(/^[0-9]+$/, "Số điện thoại không hợp lệ").min(10, 'Số điện thoại phải có ít nhất 10 chữ số').max(11, 'Số điện thoại không quá 11 chữ số'),
  emailWAQuanLy: yup.string().email('Email không hợp lệ'),

  // Thông tin gói sản phẩm (ví dụ: chọn 1 trong 3)
  selectedCombo: yup.string().required('Vui lòng chọn một gói sản phẩm'),
  // Nếu bạn muốn cho phép chọn nhiều combo hoặc số lượng, cấu trúc sẽ khác
  // Ví dụ cho Combo 1 (nếu bạn muốn nhập số tiền riêng lẻ thay vì chọn)
  // baoAnSucKhoeCombo1: yup.number().typeError('Phải là số').positive('Phải là số dương'),
  // baoAnTaiSanCombo1: yup.number().typeError('Phải là số').positive('Phải là số dương'),

  ghiChu: yup.string(),
});

const MyForm = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { // Giá trị mặc định cho form (tùy chọn)
        sttNguoiMua: '',
        soTkckBenMua: '',
        tenNguoiMuaBH: '',
        ngaySinhNguoiMua: null,
        cmndNguoiMua: '',
        tkckCatTien: '',
        hoTenTkck: '',
        cmndTkck: '',
        ngayCapTkck: null,
        noiCapTkck: '',
        idNguoiGioiThieu: '',
        tenNguoiGioiThieu: '',
        waQuanLy: '',
        teamQuanLy: '',
        soDienThoaiWA: '',
        emailWAQuanLy: '',
        selectedCombo: '',
        ghiChu: '',
    }
  });

  const onSubmit = data => {
    console.log(data);
    // Xử lý dữ liệu form tại đây (ví dụ: gửi lên server)
    alert('Form đã được gửi thành công! Kiểm tra console để xem dữ liệu.');
  };

  const combos = [
    { id: 'combo1', name: 'Combo 1', baoAnSucKhoe: 120000, baoAnTaiSan: 120000 },
    { id: 'combo2', name: 'Combo 2', baoAnSucKhoe: 120000, baoAnTaiSan: 500000 },
    { id: 'combo3', name: 'Combo 3', baoAnSucKhoe: 120000, baoAnTaiSan: 1000000 },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Thông tin người mua BH</h2>
      <div style={{ marginBottom: '15px' }}>
        <label>STT</label>
        <input {...register('sttNguoiMua')} />
        {errors.sttNguoiMua && <p style={{ color: 'red' }}>{errors.sttNguoiMua.message}</p>}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Số TKCK của Bên mua bảo hiểm_KH mua BH CN (*)</label>
        <input {...register('soTkckBenMua')} />
        {errors.soTkckBenMua && <p style={{ color: 'red' }}>{errors.soTkckBenMua.message}</p>}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Tên người mua BH (*)</label>
        <input {...register('tenNguoiMuaBH')} />
        {errors.tenNguoiMuaBH && <p style={{ color: 'red' }}>{errors.tenNguoiMuaBH.message}</p>}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Ngày tháng năm sinh (*)</label>
        <Controller
            name="ngaySinhNguoiMua"
            control={control}
            render={({ field }) => <input type="date" {...field} />}
        />
        {errors.ngaySinhNguoiMua && <p style={{ color: 'red' }}>{errors.ngaySinhNguoiMua.message}</p>}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>CMND/CCCD/HC (*)</label>
        <input {...register('cmndNguoiMua')} />
        {errors.cmndNguoiMua && <p style={{ color: 'red' }}>{errors.cmndNguoiMua.message}</p>}
      </div>

      <hr style={{ margin: '20px 0' }} />
      <h2>Thông tin TKCK cắt tiền</h2>
      <div style={{ marginBottom: '15px' }}>
        <label>TKCK cắt tiền (*)</label>
        <input {...register('tkckCatTien')} />
        {errors.tkckCatTien && <p style={{ color: 'red' }}>{errors.tkckCatTien.message}</p>}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Họ tên TKCK (*)</label>
        <input {...register('hoTenTkck')} />
        {errors.hoTenTkck && <p style={{ color: 'red' }}>{errors.hoTenTkck.message}</p>}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>CMND/CCCD/HC (*)</label>
        <input {...register('cmndTkck')} />
        {errors.cmndTkck && <p style={{ color: 'red' }}>{errors.cmndTkck.message}</p>}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Ngày cấp (*)</label>
        <Controller
            name="ngayCapTkck"
            control={control}
            render={({ field }) => <input type="date" {...field} />}
        />
        {errors.ngayCapTkck && <p style={{ color: 'red' }}>{errors.ngayCapTkck.message}</p>}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Nơi cấp (*)</label>
        <input {...register('noiCapTkck')} />
        {errors.noiCapTkck && <p style={{ color: 'red' }}>{errors.noiCapTkck.message}</p>}
      </div>

      <hr style={{ margin: '20px 0' }} />
      <h2>Thông tin người quản lý</h2>
      <div style={{ marginBottom: '15px' }}>
        <label>ID Người giới thiệu</label>
        <input {...register('idNguoiGioiThieu')} />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Tên Người giới thiệu</label>
        <input {...register('tenNguoiGioiThieu')} />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>WA Quản lý</label>
        <input {...register('waQuanLy')} />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Team</label>
        <input {...register('teamQuanLy')} />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Số điện thoại WA</label>
        <input type="tel" {...register('soDienThoaiWA')} />
        {errors.soDienThoaiWA && <p style={{ color: 'red' }}>{errors.soDienThoaiWA.message}</p>}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Email WA quản lý</label>
        <input type="email" {...register('emailWAQuanLy')} />
        {errors.emailWAQuanLy && <p style={{ color: 'red' }}>{errors.emailWAQuanLy.message}</p>}
      </div>

      <hr style={{ margin: '20px 0' }} />
      <h2>Thông tin gói sản phẩm (*)</h2>
      <div style={{ marginBottom: '15px' }}>
        <label>Chọn gói sản phẩm:</label>
        <select {...register('selectedCombo')} style={{ marginLeft: '10px', padding: '5px' }}>
          <option value="">-- Chọn gói --</option>
          {combos.map(combo => (
            <option key={combo.id} value={combo.id}>
              {combo.name} (Sức khỏe: {combo.baoAnSucKhoe.toLocaleString()}, Tài sản: {combo.baoAnTaiSan.toLocaleString()})
            </option>
          ))}
        </select>
        {errors.selectedCombo && <p style={{ color: 'red' }}>{errors.selectedCombo.message}</p>}
      </div>

      {/*
        Nếu bạn muốn nhập giá trị cho từng gói thay vì chọn từ danh sách:
        <h3>Combo 1</h3>
        <div style={{ marginBottom: '15px' }}>
            <label>Bảo an sức khỏe</label>
            <input type="number" {...register('baoAnSucKhoeCombo1')} />
            {errors.baoAnSucKhoeCombo1 && <p style={{ color: 'red' }}>{errors.baoAnSucKhoeCombo1.message}</p>}
        </div>
        <div style={{ marginBottom: '15px' }}>
            <label>Bảo an tài sản</label>
            <input type="number" {...register('baoAnTaiSanCombo1')} />
            {errors.baoAnTaiSanCombo1 && <p style={{ color: 'red' }}>{errors.baoAnTaiSanCombo1.message}</p>}
        </div>
        // Tương tự cho Combo 2, Combo 3
      */}

      <hr style={{ margin: '20px 0' }} />
      <h2>Ghi chú</h2>
      <div style={{ marginBottom: '15px' }}>
        <textarea {...register('ghiChu')} rows="4" style={{ width: '100%' }} />
      </div>

      <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Gửi thông tin
      </button>
    </form>
  );
};

export default MyForm;
