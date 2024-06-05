'use client'

import { KakaoButton } from '@packages/ui'
import { signIn } from 'next-auth/react'

const Button = ({ label = '' }: { label: string }) => {
  // TODO: 카카오 인증 팝업
  // useEffect(() => {
  //   const handleMessage = async (event) => {
  //     if (event.origin !== window.location.origin) return

  //     if (event.data.type === 'kakao-login') {
  //       // 메시지로 전달된 URL을 사용하여 로그인 상태 갱신
  //       await signIn('kakao', {
  //         callbackUrl: event.data.url,
  //         redirect: false,
  //       })
  //     }
  //   }

  //   window.addEventListener('message', handleMessage)

  //   return () => {
  //     window.removeEventListener('message', handleMessage)
  //   }
  // }, [])

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  function openKakaoPopup() {
    const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID
    const redirectUri = `${window.location.origin}/api/auth/callback/kakao`
    const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`

    const popupWidth = 600
    const popupHeight = 800
    const popupLeft = window.screen.width / 2 - popupWidth / 2
    const popupTop = window.screen.height / 2 - popupHeight / 2

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const popup = window.open(
      kakaoLoginUrl,
      'kakaoLoginPopup',
      `width=${popupWidth},height=${popupHeight},left=${popupLeft},top=${popupTop}`,
    )
  }

  const handleClick = () => {
    // openKakaoPopup()

    // 카카오 로그인/회원가입 API 호출
    signIn('kakao', {
      redirect: true,
      callbackUrl: '/',
    })
  }

  return (
    <KakaoButton
      className="mb-[37px]"
      label={label}
      onClick={() => handleClick()}
    />
  )
}

export default Button
