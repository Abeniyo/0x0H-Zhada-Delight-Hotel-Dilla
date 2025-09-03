from rest_framework import serializers
from .models import City, Amenity, RoomType, Room, RoomAmenity


class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = ["id", "name"]


class RoomTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomType
        fields = ["id", "name", "description"]


class RoomSerializer(serializers.ModelSerializer):
    amenities = AmenitySerializer(many=True, read_only=True)
    room_type = RoomTypeSerializer(read_only=True)


    class Meta:
        model = Room
        fields = [
        "id", "number", "room_type", "price_by_night", "max_guest",
        "latitude", "longitude", "description", "amenities", "is_active"
        ]