from django.db import models

from django.conf import settings
from django.db import models
from django.utils import timezone


class Booking(models.Model):
    class Status(models.TextChoices):
        PENDING = "PENDING", "Pending"
        CONFIRMED = "CONFIRMED", "Confirmed"
        CANCELLED = "CANCELLED", "Cancelled"
        REFUNDED = "REFUNDED", "Refunded"


    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="bookings")
    room = models.ForeignKey("hotels.Room", on_delete=models.PROTECT, related_name="bookings")
    check_in = models.DateField()
    check_out = models.DateField()
    guests = models.PositiveIntegerField(default=1)


    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)


    payment_reference = models.CharField(max_length=64, blank=True)
    payment_status = models.CharField(max_length=20, default="INIT")


    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Meta:
    ordering = ["-created_at"]
    indexes = [
    models.Index(fields=["room", "check_in", "check_out", "status"]),
    ]


    def overlaps(self, other_start, other_end):
        return not (self.check_out <= other_start or self.check_in >= other_end)


    def __str__(self):
        return f"Booking #{self.id} - Room {self.room.number}"