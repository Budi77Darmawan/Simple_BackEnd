-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 01 Okt 2020 pada 15.12
-- Versi server: 10.4.11-MariaDB
-- Versi PHP: 7.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hiring_apps`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `account`
--

CREATE TABLE `account` (
  `id_account` int(100) NOT NULL,
  `roleAccount` enum('Recruiters','Freelancers','Superuser') NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `numberPhone` varchar(15) NOT NULL,
  `password` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `account`
--

INSERT INTO `account` (`id_account`, `roleAccount`, `name`, `email`, `numberPhone`, `password`, `status`, `createdAt`, `updateAt`) VALUES
(35, 'Freelancers', 'Juanda', 'juanda@gmail.com', '0000000000000', '$2a$12$jbiQB4fMRTPK5/UzyJ5KoOyrjO3wfSGG5k9c6pw7oF7FIueMmgLea', 1, '2020-09-23 10:06:49', NULL),
(43, 'Recruiters', 'Jaya', 'jaya@gmail.com', '0000000000000', '$2a$12$53CFqTrLzqOdmkPxE7U8/OekTStrg2wCA7Kx3j5NdfRCsSBZkBEjy', 1, '2020-09-25 09:37:24', '2020-09-25 14:49:41'),
(47, 'Freelancers', 'Dicky', 'dicky@gmail.com', '0000000000000', '$2a$12$Q.KqSE5jGeIG1R9SO3Qqd.OM0rdsFMHFbaZ9Xqz/rziiYLa38BN/y', 1, '2020-09-26 05:10:42', NULL),
(48, 'Freelancers', 'Eca', 'eca@gmail.com', '0000000000000', '$2a$12$xLbEJde6cOQI.JLLro46KeVgT.S7WhxT7LP4JJw.OG6K8RMtCbGiS', 1, '2020-09-26 05:10:58', NULL),
(51, 'Recruiters', 'Budi Darmawan', 'budi@gmail.com', '0000000000000', '$2a$12$M65JN1k/4N8YxeVNgOIwKuiD.4lRO3qzKD9CVK/0oPzN/pcJ1bKg2', 1, '2020-10-01 06:53:18', NULL),
(52, 'Freelancers', 'Free', 'free@gmail.com', '0000000000000', '$2a$12$5eLBeHjqmFqw3uUDNuPWwOFKCaI1tRW04j6KUTeIpizW66EtzV2Qe', 1, '2020-10-01 06:54:15', NULL),
(53, 'Recruiters', 'Joko', 'joko@gmail.com', '1234512334', '$2a$12$oLhhPJETuQoESAvR7AqLDeOOIVyUVDG5tfPipHgRecIq3Dbj6zbbu', 1, '2020-10-01 07:25:51', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `freelancers`
--

CREATE TABLE `freelancers` (
  `id_freelancer` int(11) NOT NULL,
  `id_account` int(11) NOT NULL,
  `jobDesc` varchar(100) DEFAULT NULL,
  `statusJob` varchar(100) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `workPlace` varchar(100) DEFAULT NULL,
  `cityAddress` varchar(100) DEFAULT NULL,
  `image` varchar(300) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `freelancers`
--

INSERT INTO `freelancers` (`id_freelancer`, `id_account`, `jobDesc`, `statusJob`, `description`, `workPlace`, `cityAddress`, `image`, `createdAt`, `updateAt`) VALUES
(17, 35, 'IOS Developer', 'Full Time', 'deksripsi', 'Jakarta', 'Jakarta', 'image-1601359091258.jpg', '2020-09-23 13:10:49', '2020-09-29 05:58:55'),
(23, 47, 'Android Developer', 'Part Time', NULL, 'Malang', 'Malang', NULL, '2020-09-26 05:10:42', NULL),
(24, 48, 'Web Developer', 'Freelancers', NULL, 'Yogyakarta', 'Yogyakarta', NULL, '2020-09-26 05:10:58', NULL),
(25, 52, NULL, NULL, NULL, NULL, NULL, NULL, '2020-10-01 06:54:15', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `hire_project`
--

CREATE TABLE `hire_project` (
  `id_hire` int(100) NOT NULL,
  `id_accountRec` int(100) NOT NULL,
  `id_accountFree` int(100) NOT NULL,
  `id_project` int(100) NOT NULL,
  `message` varchar(300) NOT NULL,
  `projectJob` varchar(100) NOT NULL,
  `price` varchar(100) NOT NULL,
  `statusConfirm` int(11) NOT NULL DEFAULT 0,
  `confirmDate` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `portofolio`
--

CREATE TABLE `portofolio` (
  `id_portofolio` int(100) NOT NULL,
  `id_account` int(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` varchar(200) NOT NULL,
  `description` varchar(300) NOT NULL,
  `linkRepo` varchar(200) NOT NULL,
  `typePorto` enum('Mobile','Web') DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `project`
--

CREATE TABLE `project` (
  `id_project` int(100) NOT NULL,
  `id_account` int(100) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `project`
--

INSERT INTO `project` (`id_project`, `id_account`, `name`, `image`, `description`, `deadline`, `createdAt`, `updateAt`) VALUES
(15, 43, 'Free Fire', 'image-1601176227003.png', 'BOOYAH!!!', '2021-01-01', '2020-09-27 11:10:27', NULL),
(16, 43, 'PUBG', 'image-1601176227003.png', 'WWCD!!!', '2021-01-01', '2020-09-27 11:10:27', NULL),
(17, 43, 'POU', 'image-1601176227003.png', 'Zaman Old', '2021-01-01', '2020-09-27 11:10:27', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `recruiters`
--

CREATE TABLE `recruiters` (
  `id_recruiter` int(100) NOT NULL,
  `id_account` int(100) NOT NULL,
  `companyName` varchar(100) NOT NULL,
  `position` varchar(100) DEFAULT NULL,
  `sector` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `website` varchar(100) DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `recruiters`
--

INSERT INTO `recruiters` (`id_recruiter`, `id_account`, `companyName`, `position`, `sector`, `city`, `description`, `website`, `image`, `createdAt`, `updateAt`) VALUES
(5, 43, 'PT. Cahaya Abadi', 'HRD', 'Financial', 'Nunukan', 'deskripsi', 'www.cahayaabadi.com', 'image-1601356794473.jpg', '2020-09-25 09:37:24', '2020-09-29 05:20:42'),
(9, 51, 'PT. Cahaya Abadi', 'HRD', NULL, NULL, NULL, NULL, NULL, '2020-10-01 06:53:18', NULL),
(10, 53, 'PT. Abu Abu', 'CEO', NULL, NULL, NULL, NULL, NULL, '2020-10-01 07:25:51', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `skill`
--

CREATE TABLE `skill` (
  `id_skill` int(100) NOT NULL,
  `skill_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `skill`
--

INSERT INTO `skill` (`id_skill`, `skill_name`) VALUES
(1, 'Kotlin'),
(2, 'Java'),
(3, 'Javascript'),
(4, 'C'),
(5, 'C++'),
(6, 'Go'),
(7, 'PHP'),
(8, 'Python'),
(9, 'Pascal'),
(10, 'Ruby'),
(11, 'Swift'),
(12, 'SQL'),
(13, 'Postsgre SQL'),
(14, 'HTML'),
(15, 'CSS');

-- --------------------------------------------------------

--
-- Struktur dari tabel `skill_freelancers`
--

CREATE TABLE `skill_freelancers` (
  `id_skillfreelancer` int(100) NOT NULL,
  `id_account` int(100) NOT NULL,
  `id_skill` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `skill_freelancers`
--

INSERT INTO `skill_freelancers` (`id_skillfreelancer`, `id_account`, `id_skill`) VALUES
(10, 35, 1),
(11, 35, 12),
(12, 35, 2),
(13, 47, 4),
(14, 47, 5),
(17, 48, 14),
(18, 48, 15),
(19, 48, 3);

-- --------------------------------------------------------

--
-- Struktur dari tabel `work_exp`
--

CREATE TABLE `work_exp` (
  `id_exp` int(100) NOT NULL,
  `id_account` int(100) NOT NULL,
  `companyName` varchar(100) NOT NULL,
  `position` varchar(100) NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL,
  `description` varchar(300) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `work_exp`
--

INSERT INTO `work_exp` (`id_exp`, `id_account`, `companyName`, `position`, `start`, `end`, `description`, `createdAt`, `updateAt`) VALUES
(2, 35, 'PT. Garena Indonesia', 'HRD', '2017-01-01', '2020-01-01', 'Deskripsi', '2020-09-27 09:42:16', '2020-09-27 09:47:14');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id_account`);

--
-- Indeks untuk tabel `freelancers`
--
ALTER TABLE `freelancers`
  ADD PRIMARY KEY (`id_freelancer`),
  ADD KEY `KeyFreelancers` (`id_account`);

--
-- Indeks untuk tabel `hire_project`
--
ALTER TABLE `hire_project`
  ADD PRIMARY KEY (`id_hire`),
  ADD KEY `KeyIDProject` (`id_project`),
  ADD KEY `KeyIDRec` (`id_accountRec`),
  ADD KEY `KeyIDFree` (`id_accountFree`);

--
-- Indeks untuk tabel `portofolio`
--
ALTER TABLE `portofolio`
  ADD PRIMARY KEY (`id_portofolio`),
  ADD KEY `KeyPorto` (`id_account`);

--
-- Indeks untuk tabel `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id_project`),
  ADD KEY `KeyProject` (`id_account`);

--
-- Indeks untuk tabel `recruiters`
--
ALTER TABLE `recruiters`
  ADD PRIMARY KEY (`id_recruiter`),
  ADD KEY `KeyRecruiters` (`id_account`);

--
-- Indeks untuk tabel `skill`
--
ALTER TABLE `skill`
  ADD PRIMARY KEY (`id_skill`);

--
-- Indeks untuk tabel `skill_freelancers`
--
ALTER TABLE `skill_freelancers`
  ADD PRIMARY KEY (`id_skillfreelancer`),
  ADD KEY `KeyAccFree` (`id_account`),
  ADD KEY `KeySkill` (`id_skill`);

--
-- Indeks untuk tabel `work_exp`
--
ALTER TABLE `work_exp`
  ADD PRIMARY KEY (`id_exp`),
  ADD KEY `KeyExp` (`id_account`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `account`
--
ALTER TABLE `account`
  MODIFY `id_account` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT untuk tabel `freelancers`
--
ALTER TABLE `freelancers`
  MODIFY `id_freelancer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT untuk tabel `hire_project`
--
ALTER TABLE `hire_project`
  MODIFY `id_hire` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `portofolio`
--
ALTER TABLE `portofolio`
  MODIFY `id_portofolio` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `project`
--
ALTER TABLE `project`
  MODIFY `id_project` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT untuk tabel `recruiters`
--
ALTER TABLE `recruiters`
  MODIFY `id_recruiter` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `skill`
--
ALTER TABLE `skill`
  MODIFY `id_skill` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT untuk tabel `skill_freelancers`
--
ALTER TABLE `skill_freelancers`
  MODIFY `id_skillfreelancer` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT untuk tabel `work_exp`
--
ALTER TABLE `work_exp`
  MODIFY `id_exp` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `freelancers`
--
ALTER TABLE `freelancers`
  ADD CONSTRAINT `KeyFreelancers` FOREIGN KEY (`id_account`) REFERENCES `account` (`id_account`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `hire_project`
--
ALTER TABLE `hire_project`
  ADD CONSTRAINT `KeyIDFree` FOREIGN KEY (`id_accountFree`) REFERENCES `account` (`id_account`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `KeyIDProject` FOREIGN KEY (`id_project`) REFERENCES `project` (`id_project`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `KeyIDRec` FOREIGN KEY (`id_accountRec`) REFERENCES `account` (`id_account`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `portofolio`
--
ALTER TABLE `portofolio`
  ADD CONSTRAINT `KeyPorto` FOREIGN KEY (`id_account`) REFERENCES `account` (`id_account`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `KeyProject` FOREIGN KEY (`id_account`) REFERENCES `account` (`id_account`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `recruiters`
--
ALTER TABLE `recruiters`
  ADD CONSTRAINT `KeyRecruiters` FOREIGN KEY (`id_account`) REFERENCES `account` (`id_account`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `skill_freelancers`
--
ALTER TABLE `skill_freelancers`
  ADD CONSTRAINT `KeyAccFree` FOREIGN KEY (`id_account`) REFERENCES `account` (`id_account`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `KeySkill` FOREIGN KEY (`id_skill`) REFERENCES `skill` (`id_skill`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `work_exp`
--
ALTER TABLE `work_exp`
  ADD CONSTRAINT `KeyExp` FOREIGN KEY (`id_account`) REFERENCES `account` (`id_account`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
