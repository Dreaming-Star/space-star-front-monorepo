import { forwardRef, useImperativeHandle, useContext, useEffect, useRef, useState } from 'react';
import { ModalContext } from '@/components/providers/modal-provider';
import FormLayout from '@/components/form/formLayout';
import { BellOff, Bell } from 'lucide-react'; // BellOff와 Bell 아이콘 추가
import { getAlarms, getNicknameByUuid, getProfileImageByUuid } from '@/apis/getAlarms';
import { AlarmListType } from '@/types/type';
import AlarmListItem from './AlarmListItem';
import SseConnection from './SseConnection';

const AlarmListContainer = forwardRef(({ accessToken }, ref) => {
    const { openModal } = useContext(ModalContext);
    const [alarms, setAlarms] = useState<AlarmListType[]>([]);
    const [sseActive, setSseActive] = useState(false); // SSE 비활성 상태로 초기화
    const sseConnectionRef = useRef(null);

    useEffect(() => {
        const fetchAlarms = async () => {
            const alarmData = await getAlarms(accessToken);
            if (alarmData) {
                const alarmsWithDetails = await Promise.all(alarmData.map(async (alarm) => {
                    const nicknameData = await getNicknameByUuid(alarm.senderUuid);
                    const profileImageData = await getProfileImageByUuid(alarm.senderUuid, accessToken);
                    return {
                        ...alarm,
                        senderNickname: nicknameData?.nickname || 'Unknown',
                        senderProfileImage: profileImageData?.profileImageUrl || '/default-profile.png',
                    };
                }));
                setAlarms(alarmsWithDetails);
            }
        };
        fetchAlarms();
    }, [accessToken]);

    useImperativeHandle(ref, () => ({
        openAlarmModal: () => {
            openModal(
                <div className="relative h-full flex flex-col items-center">
                    <FormLayout className="relative h-full px-[204px] pt-[90px] pb-[85px] flex flex-col items-center">
                        <div className="relative w-full flex items-center justify-center">
                            <FormLayout.Legend title="알림"/>
                            <button 
                                className="absolute right-0 p-2 bg-gray-200 rounded-full" 
                                onClick={() => {
                                    if (sseConnectionRef.current) {
                                        if (sseActive) {
                                            sseConnectionRef.current.disconnect();
                                        } else {
                                            sseConnectionRef.current.connect();
                                        }
                                        setSseActive(!sseActive);
                                    }
                                }}>
                                {sseActive ? <BellOff size={16} /> : <Bell size={16} />}
                            </button>
                        </div>
                        <div className="flex flex-col items-center custom-scrollbar" style={{ maxHeight: '60vh', width: '100%', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            {alarms && alarms.length > 0 ? (
                                alarms.map((alarm) => (
                                    <AlarmListItem 
                                        key={alarm.index}
                                        senderProfileImage={alarm.senderProfileImage}
                                        senderNickname={alarm.senderNickname}
                                        alarmType={alarm.alarmType === 'FRIEND' ? '친구요청' : '매칭요청'}
                                        content={alarm.content}
                                    />
                                ))
                            ) : (
                                <p>새로운 알림이 없습니다.</p>
                            )}
                        </div>
                    </FormLayout>
                </div>
            );
        }
    }));

    useEffect(() => {
        if (sseConnectionRef.current && sseActive) {
            sseConnectionRef.current.connect();
        } else if (sseConnectionRef.current && !sseActive) {
            sseConnectionRef.current.disconnect();
        }
    }, [sseActive]);

    return (
        <>
            <SseConnection ref={sseConnectionRef} uuid={accessToken} onMessageReceived={() => {}} />
        </>
    );
});

export default AlarmListContainer;