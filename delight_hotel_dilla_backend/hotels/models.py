from django.db import models

from django.core.exceptions import ValidationError


class City(models.Model):
    name = models.CharField(max_length=120, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    class Meta:
     verbose_name_plural = "Cities"


    def __str__(self):
     return self.name


class Amenity(models.Model):
    name = models.CharField(max_length=120, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
      return self.name


class RoomType(models.Model):
    name = models.CharField(max_length=120, unique=True)
    description = models.TextField(blank=True)


    def __str__(self):
        return self.name


class Room(models.Model):
    number = models.CharField(max_length=20, unique=True)
    city = models.ForeignKey(City, on_delete=models.PROTECT)
    room_type = models.ForeignKey(RoomType, on_delete=models.PROTECT)
    price_by_night = models.DecimalField(max_digits=10, decimal_places=2)
    max_guest = models.PositiveIntegerField(default=1)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    amenities = models.ManyToManyField(Amenity, through='RoomAmenity', related_name='rooms')


    def clean(self):
        if self.city.name.lower() != "dilla":
            raise ValidationError("Only Dilla city is allowed for this system.")


    def __str__(self):
        return f"Room {self.number} ({self.room_type})"


class RoomAmenity(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    amenity = models.ForeignKey(Amenity, on_delete=models.CASCADE)


    class Meta:
     unique_together = ("room", "amenity")