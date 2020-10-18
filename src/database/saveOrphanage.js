function saveOrphanage(db, orphanage) {
    return db.run(
        `INSERT INTO orphanages (
         name, about, whatsapp, images, instructions, opening_hours, open_on_weekend, lat, lng
        ) VALUES (
            "${orphanage.name}",
            "${orphanage.about}",
            "${orphanage.whatsapp}",
            "${orphanage.images}",
            "${orphanage.instructions}",
            "${orphanage.opening_hours}",
            "${orphanage.open_on_weekend}",
            "${orphanage.lat}",
            "${orphanage.lng}"
        )`
    );
}

module.exports = saveOrphanage;