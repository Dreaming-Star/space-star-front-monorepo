'use server'

// interface FormDataType {
//   email: string
//   nickname: string
//   imageUrl: string
//   gender: string
//   birth: string
//   infoAgree: boolean
// }

async function createUser(formData: FormData) {
  // console.log(formData.get('email'))
  // console.log(formData.get('nickname'))
  console.log(formData)
  console.log(formData.get('nickname'))
  // try {
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/auth/join`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(formData),
  //   })
  // } catch (error) {
  //   console.error('Error:', error)
  // }
}

export default createUser
