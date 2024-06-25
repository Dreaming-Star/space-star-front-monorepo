import FriendsWrapper from '@/components/Friends/FriendsWrapper'
import { friendsWithBasicDataType } from '@/lib/getFriendsData'

import MessageItem from './MessageItem'

import styles from './chat.module.css'
import GroupMessageItem from './GroupMessageItem'

const MessageWrapper = ({
  title,
  chatRoomList,
  token,
}: {
  title: string
  chatRoomList: any[]
  token: string
}) => {
  return (
    <section className="mb-9">
      <h3 className="text-[#161616] text-lg not-italic font-medium leading-[normal] mb-6">
        {title}
      </h3>

      <div className="flex flex-col gap-2 scroll-none">
        {chatRoomList.map((chatRoom) => (
          <MessageItem key={chatRoom.index} room={chatRoom} token={token} />
        ))}
      </div>
    </section>
  )
}

const GroupMessageWrapper = ({
  title,
  roomList,
  token,
}: {
  title: string
  roomList: any[]
  token: string
}) => {
  return (
    <section className="mb-9">
      <h3 className="text-[#161616] text-lg not-italic font-medium leading-[normal] mb-6">
        {title}
      </h3>

      <div className="flex flex-col gap-2 scroll-none">
        {roomList.map((room) => (
          <GroupMessageItem key={room.index} room={room} token={token} />
        ))}
      </div>
    </section>
  )
}

export default function MessageContainer({
  friendsList,
  oneToOneChatRooms,
  groupChatRooms,
  token,
}: {
  friendsList: friendsWithBasicDataType[]
  oneToOneChatRooms: any[]
  groupChatRooms: any[]
  token: string
}) {
  return (
    <div className={styles['messages-container']}>
      <FriendsWrapper friendsList={friendsList} />
      <MessageWrapper
        title="Messages"
        chatRoomList={oneToOneChatRooms}
        token={token}
      />
      <GroupMessageWrapper
        title="Group Messages"
        roomList={groupChatRooms}
        token={token}
      />
    </div>
  )
}
