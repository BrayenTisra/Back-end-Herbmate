-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 27, 2024 at 12:26 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `herbmate_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `idUser` int(50) NOT NULL,
  `username` text NOT NULL,
  `email` text NOT NULL,
  `password` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`idUser`, `username`, `email`, `password`) VALUES
(1, 'ay', 'ay@gmail.com', '7'),
(3, 'wow', 'wow@gmail.com', '$2b$10$pzFdKMCWFvJYf0MMFhDLGuMIQGb/wcamA18FWbj89U4ZhA2hHwYOC'),
(4, 'yen', 'yen@email.com', '$2b$10$WSEKQ1vR7mYsCpq22r554u.xgAwCVj1dgrwopX4jT8BPROJI71qsy'),
(18, 'Brayen Tisra Sarira C269B4KY0869', 'c269b4ky0869@bangkit.academy', 'GOOGLE_AUTH'),
(19, 'Briks', 'briksbroken23@gmail.com', NULL),
(20, 'Brayen Tisra Sarira', 'brayentsarira123@gmail.com', NULL),
(21, 'yen', 'mantap@email.com', '$2b$10$qmnJO9CSrON5iEpXC6YHSek6GMJci7Y7GgjHcuutEqJ1B.zB0GX62'),
(22, 'nahh', 'nahh@email.com', '$2b$10$3Tkq.VADv/jAaKdks89Lk.OcxzCFnJDoEk2w28ANxdAmdDK2ypN66'),
(23, 'cahh', 'cahh@email.com', '$2b$10$Adl7JdaPpA8DZv2QqyQ2fu52.nWPrzZv8cIoTy2UeLwvK6FXasEAK'),
(24, 'ca', 'ca@email.com', '$2b$10$tXKlDXiyDrZcTOHEgiS9nOPsxgcsDch93Mt/a6DTjC7WgbYkGOvkq'),
(25, 'a', 'a@email.com', '$2b$10$Bwq7xqqNC/l4tV/e74/fJ.9lz5aloU2pnqoro09miZ8oe7BFzhCHC'),
(26, 'z', 'z@email.com', '$2b$10$8ncFUhVrpVYpXGBicE8N5OpNPJW9M.1HxxK8kGF1LyfpofeY/xYA6');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
