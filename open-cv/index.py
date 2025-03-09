import cv2
import cv2.aruco as aruco
import numpy as np

matrix_cam = np.array([[1000, 0, 320], [0, 1000, 240], [0, 0, 1]], dtype=np.float32) 
distortion = np.zeros((1, 5))

aruco_dict = aruco.getPredefinedDictionary(aruco.DICT_6X6_250)
parameters = aruco.DetectorParameters()

cap = cv2.VideoCapture(0)

cube_points = np.float32([
    [0, 0, 0],
    [0, 0.05, 0],
    [0.05, 0.05, 0],
    [0.05, 0, 0],
    [0, 0, -0.05],
    [0, 0.05, -0.05],
    [0.05, 0.05, -0.05],
    [0.05, 0, -0.05]
])

while True:
    ret, frame = cap.read()
    if not ret:
        break

    corners, ids, _ = aruco.detectMarkers(frame, aruco_dict, parameters=parameters)
    
    if ids is not None:
        aruco.drawDetectedMarkers(frame, corners, ids)
        
        rvec, tvec, _ = aruco.estimatePoseSingleMarkers(corners, 0.05, matrix_cam, distortion)
        
        rvec = rvec[0][0]
        tvec = tvec[0][0]
        
        cv2.drawFrameAxes(frame, matrix_cam, distortion, rvec, tvec, 0.1)
        
        projected_points, _ = cv2.projectPoints(cube_points, rvec, tvec, matrix_cam, distortion)
        projected_points = np.int32(projected_points).reshape(-1, 2)
        
        for i, j in [(0,1), (1,2), (2,3), (3,0),
                     (4,5), (5,6), (6,7), (7,4),
                     (0,4), (1,5), (2,6), (3,7)]:
            cv2.line(frame, tuple(projected_points[i]), tuple(projected_points[j]), (0, 255, 0), 2)
    
    cv2.imshow("AR con ARUco", frame)
    
    if cv2.waitKey(1) == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()