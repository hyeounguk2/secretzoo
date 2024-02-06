import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput } from 'flowbite-react';
import { useDispatch} from 'react-redux';
import { setNoLoginUserInfo } from '../../store/userSlice';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

const NoLogin = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const saveName = () => {
    if (name.length > 0) {
      sessionStorage.setItem('noLogin', true);
      sessionStorage.setItem('userNickname', name);
      const noLoginUser = ({
        "name": 'noLoginUser',
        "nickname": sessionStorage.getItem('userNickname'),
        "mainReward": '로그인 하세요',
        "profileNumber": '000',
        "level" : '0',
        "userSequence" : uuidv4(),
      });
      dispatch(setNoLoginUserInfo(noLoginUser));
      navigate("/lobby");
    } else {
      Swal.fire({
        "text" : '닉네임은 필수입니다.',
        "confirmButtonColor" : '#3085d6'
      });
    }
  };

  return (
    <>
      <form>
        <div className='pt-20'>
          <div className="mb-2 block">
            <Label value="닉네임" />
          </div>
          <TextInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="비회원으로 사용할 닉네임"
            type="text" required />
        </div>
        <Button
          type="submit"
          onClick={(e) => { e.preventDefault(); saveName(); }}
          className="w-full mt-2">참가</Button>
      </form>
    </>
  );
};

export default NoLogin;
