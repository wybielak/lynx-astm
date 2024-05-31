import React, { useEffect, useState } from 'react'
import { auth } from '../../config/FirebaseConfig';
import { useStore } from '../../mobx/Store';
import { observer } from 'mobx-react-lite';

export default observer(function SingeCourse({ courseId, courseName, ownerId, buttonDisplay}) {

    const { appStorage } = useStore();

    const [ownerName, setOwnerName] = useState('')
    const [ownerNameLoading, setOwnerNameLoading] = useState(false)

    useEffect(() => {
        setOwnerNameLoading(true)
        appStorage.getNameById(ownerId).then((name) => {
            setOwnerName(name)
            setOwnerNameLoading(false)
        })
    })

    return (
        <>
            <div className='course-join-info'>
                <div>
                    <h3>{courseName}</h3>
                    {ownerNameLoading ? <p>{ownerName}</p> : <p>Ładowanie ...</p>}
                </div>
                <button style={{display: buttonDisplay}} onClick={() => appStorage.addWaitingStudentToCourse(courseId, auth?.currentUser?.uid)}>Dołącz</button>
            </div>
        </>
    )
})